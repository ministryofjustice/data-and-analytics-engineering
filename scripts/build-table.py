import requests
from environs import Env
from tabulate import tabulate

env = Env()
env.read_env()  # Read the .env file

org = 'moj-analytical-services'
topic = 'dmet-python-packages'
token = env('GH_QUERY_TOKEN')

url = f"https://api.github.com/search/repositories?q=org:{org}+topic:{topic}"

headers = {
    "Authorization": f"token {token}"
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
        name = repo['name']
        description = repo['description']
        table_data.append([name, description])

    # Print the table
    print(table_data)
else:
    print('Failed to retrieve data from the GitHub API')
