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
OUTPUT_FILE="${LABEL}_discussions.json" # Output file for all discussions

# Initialize the output file
echo "[" > "$OUTPUT_FILE" # Start the JSON array

first_item=true # Flag to handle commas correctly

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
            title: .node.title,
            url: .node.url,
            author: .node.author.login,
            labels: [.node.labels.nodes[].name | select(. != \"$LABEL\")],
            repo: \"$REPO_NAME\",
            last_updated: (.node.updatedAt | split(\"T\") | .[0]) 
        }")

      # Append discussions to the output file
      while IFS= read -r discussion; do
          if $first_item; then
              first_item=false
          else
              echo "," >> "$OUTPUT_FILE" # Add a comma before each subsequent item
          fi
          echo "$discussion" >> "$OUTPUT_FILE" # Write the discussion to the file
      done <<< "$discussions" # Read discussions from the variable
  else
      echo "Error: No discussions found or invalid response for '$ORG/$REPO_NAME'."
      echo "$response" # Print the full response for debugging
  fi
done

# Close the JSON array
echo "]" >> "$OUTPUT_FILE" # Close the JSON array

# Prettify the JSON file
jq . "$OUTPUT_FILE" > tmp.json && mv tmp.json "$OUTPUT_FILE"

echo "All discussions saved to $OUTPUT_FILE"