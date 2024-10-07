#!/bin/bash

# Load environment variables from .env file if it exists
if [ -f .env ]; then
  echo "Loading environment variables from .env file..."
  export $(grep -v '^#' .env | xargs)
fi

# Ensure that the GITHUB_TOKEN environment variable is set
if [ -z "$GITHUB_TOKEN" ]; then
  echo "Error: GITHUB_TOKEN environment variable is not set."
  exit 1
fi

# Variables
REPOSITORIES=(
  "moj-analytical-services/dmet-cfe"
  "moj-analytical-services/create-a-derived-table"
)
LABEL="RFC" # Label to filter discussions
OUTPUT_DIR="./src/content/handbook/rfcs/rfc_posts/" # Output directory for markdown files

# Loop through each repository
for REPO in "${REPOSITORIES[@]}"; do
  ORG=$(echo $REPO | cut -d '/' -f 1)
  REPO_NAME=$(echo $REPO | cut -d '/' -f 2)

  # GraphQL query
  QUERY=$(cat <<EOF
{
  "query": "query { \
    repository(owner: \\"$ORG\\", name: \\"$REPO_NAME\\") { \
      discussions(first: 100) { \
        edges { \
          node { \
            number \
            title \
            url \
            author { login } \
            updatedAt \
            labels(first: 10) { nodes { name } } \
          } \
        } \
      } \
    } \
  }"
}
EOF
)

  # Make the GraphQL API request using curl
  response=$(curl -s -H "Authorization: Bearer $GITHUB_TOKEN" \
                   -H "Content-Type: application/json" \
                   -d "$QUERY" \
                   https://api.github.com/graphql)

  # Print the raw response for debugging
  echo "$response"

  # Check if response contains data
  if echo "$response" | jq -e '.data.repository.discussions.edges' > /dev/null; then
      # Filter discussions with the specific label and extract the node
      discussions=$(echo "$response" | jq -c "
        .data.repository.discussions.edges[] | 
        select(.node.labels.nodes | map(.name) | index(\"$LABEL\")) | 
        {
            id: .node.number,
            title: .node.title,
            url: .node.url,
            author: .node.author.login,
            labels: [.node.labels.nodes[].name | select(. != \"$LABEL\")],
            repo: \"$REPO_NAME\",
            last_updated: (.node.updatedAt | split(\"T\") | .[0]) 
        }")

      # Save each discussion as a markdown file
      while IFS= read -r discussion; do
          discussion_id=$(echo "$discussion" | jq -r '.id')
          title=$(echo "$discussion" | jq -r '.title')
          url=$(echo "$discussion" | jq -r '.url')
          author=$(echo "$discussion" | jq -r '.author')
          labels=$(echo "$discussion" | jq -r '.labels | join("\n- ")')
          repo=$(echo "$discussion" | jq -r '.repo')
          last_updated=$(echo "$discussion" | jq -r '.last_updated')
          file_path="$OUTPUT_DIR/${repo}_${discussion_id}.md"

          # Write the discussion info to a markdown file
          cat <<EOF > "$file_path"
---
title: $title
description: $repo
date: $last_updated
author:
  name: $author
permalink: "/rfcs/rfc_posts/{{ title | slugify }}/"
tags:
$(if [ -n "$labels" ]; then echo "- $labels"; fi)
eleventyNavigation:
  key: $title
  parent: rfcs
---

[$title]($url)

EOF

          echo "Saved discussion '$title' to $file_path"

      done <<< "$discussions" # Read discussions from the variable
  else
      echo "Error: No discussions found or invalid response for '$ORG/$REPO_NAME'."
      echo "$response" # Print the full response for debugging
  fi
done

echo "All discussions saved as markdown files in '$OUTPUT_DIR'."
