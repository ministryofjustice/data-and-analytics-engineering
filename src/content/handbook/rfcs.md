---
layout: sub-navigation
title: Request for Comments
eleventyNavigation:
  key:  Request for Comments
  parent: Handbook
  order: 8
---

<table id="discussionsTable" class="govuk-table">
    <thead class="govuk-table__head">
        <tr class="govuk-table__row">
            <th class="govuk-table__header govuk-!-width-one-half">Title</th>
            <th class="govuk-table__header">Labels</th>
            <th class="govuk-table__header">Repository</th>
            <th class="govuk-table__header govuk-!-width-one-quarter">Author</th>
            <th class="govuk-table__header">Last Updated</th>
        </tr>
    </thead>
    <tbody class="govuk-table__body">
        <!-- Data will be injected here by JavaScript -->
    </tbody>
</table>

<script>
// URL to the raw JSON file in your GitHub repository
const jsonFileUrl = 'https://raw.githubusercontent.com/ministryofjustice/data-and-analytics-engineering/refs/heads/add-rfc-discussions/get_discussions/RFC_discussions.json';

// Function to fetch and display the JSON data
fetch(jsonFileUrl)
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('discussionsTable').getElementsByTagName('tbody')[0];
        
        data.forEach(discussion => {
            // Create a new row
            const row = document.createElement('tr');
            
            // Insert columns (Title, URL, Author, Labels, Repo)
            row.innerHTML = `
                <td class="govuk-table__cell"><a href="${discussion.url}" target="_blank">${discussion.title}</a></td>
                <td class="govuk-table__cell">${discussion.labels.join(', ')}</td>
                <td class="govuk-table__cell">${discussion.repo}</td>
                <td class="govuk-table__cell">${discussion.author}</td>
                <td class="govuk-table__cell">${discussion.last_updated}</td>
            `;
            
            // Append the row to the table
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching the JSON:', error));
</script>
