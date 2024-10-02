import requests
from tabulate import tabulate

# Make a GET request to the GitHub API
response = requests.get('https://api.github.com')

# Check if the request was successful
if response.status_code == 200:
    # Convert the response to JSON format
    data = response.json()

    # Extract the relevant information from the response
    table_data = []
    for key, value in data.items():
        table_data.append([key, value])

    # Create the table using the tabulate library
    table = tabulate(table_data, headers=['Key', 'Value'], tablefmt='grid')

    # Print the table
    print(table)
else:
    print('Failed to retrieve data from the GitHub API')