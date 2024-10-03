import os
import requests
from environs import Env
from tabulate import tabulate

env = Env()
env.read_env()  # Read the .env file

org = 'moj-analytical-services'
topic = 'dmet-python-packages'
github_token = os.getenv('GITHUB_TOKEN')
table_marker = '<<REPOS ADDED AT BUILD TIME>>'
file_path = 'src/content/handbook/python-repositories.md'


url = f"https://api.github.com/search/repositories?q=org:{org}+topic:{topic}"

headers = {
    "Authorization": f"token {github_token}"
}

# Send a GET request with authentication
response = requests.get(url, headers=headers)

# Check if the request was successful
if response.status_code == 200:
    # Convert the response to JSON format
    data = response.json()

    # Extract the relevant information from the response
    table_data = []
    for repo in data['items']:
        markdown_headers = ["Repository", "Description"]
        repo_url = f"[{repo['name']}]({repo['html_url']})"
        desc = repo['description']
        table_data.append([repo_url, desc])

    table_md = tabulate(table_data,
                        headers=markdown_headers,
                        tablefmt='pipe')
    with open(file_path, 'r') as file:
        markdown = file.read()
    markdown_updated = markdown.replace(table_marker, table_md)
    with open(file_path, 'w') as file:
        file.write(markdown_updated)
else:
    print('Failed to retrieve data from the GitHub API')
