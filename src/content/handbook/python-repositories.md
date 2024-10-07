---
layout: sub-navigation
title: Python Repositories
eleventyNavigation:
  key: Python Repositories
  parent: Handbook
  order: 7
---

<table id="repoTable" class="govuk-table">
    <thead class="govuk-table__head">
        <tr>
            <th class="govuk-table__header">Repository</th>
            <th class="govuk-table__header">Description</th>
        </tr>
    </thead>
    <tbody id="repoTableBody" class="govuk-table__body">
        <!-- Repositories will be inserted here -->
    </tbody>
</table>

<script>
    // This function will be called as soon as the page loads
    async function fetchRepos() {
        const org = 'moj-analytical-services';
        const topic = 'dmet-python-packages';
        const token = 'YOUR_GITHUB_TOKEN'; // Replace with your actual GitHub token

        // GitHub Search API URL with organization and topic filters
        const url = `https://api.github.com/search/repositories?q=org:${org}+topic:${topic}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/vnd.github+json',
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            displayRepos(data.items);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Error fetching data, please check your token or network connection.');
        }
    }

    function displayRepos(repos) {
        const tableBody = document.getElementById('repoTableBody');
        tableBody.innerHTML = ''; // Clear the previous results

        if (repos.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="3">No repositories found</td></tr>';
            return;
        }

        repos.forEach(repo => {
            const row = document.createElement('tr');
            row.classList.add('govuk-table__row'); 

            // Repository name with a link
            const repoNameCell = document.createElement('td');
            repoNameCell.classList.add('govuk-table__cell'); 
            const repoLink = document.createElement('a');
            repoLink.href = repo.html_url;
            repoLink.textContent = repo.full_name;
            repoLink.target = '_blank'; // Open link in a new tab
            repoNameCell.appendChild(repoLink);
            row.appendChild(repoNameCell);

            // Repository description
            const descriptionCell = document.createElement('td');
            descriptionCell.classList.add('govuk-table__cell'); 
            descriptionCell.textContent = repo.description ? repo.description : 'No description available';
            row.appendChild(descriptionCell);

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    }

    // Call the fetchRepos function when the window loads
    window.onload = fetchRepos;
</script>
