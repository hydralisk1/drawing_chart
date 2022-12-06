import requests
import json

url = 'https://www.alphavantage.co/query'
function = 'TIME_SERIES_WEEKLY'
symbol = 'AAPL' # Apple
apikey = 'JV5XCOLN3TAW7S49'

response = requests.get(f'{url}?function={function}&symbol={symbol}&apikey={apikey}')
data = response.json()

with open('weekly.json', 'w') as outfile:
    json.dump(data, outfile)
