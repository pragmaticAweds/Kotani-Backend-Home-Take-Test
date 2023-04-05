# Kotani Backend Test

This is a backend server built on top of nodeJS performing these functionalities with their respective api:

- /accounts: Fetches all Ethereum accounts that have interacted with the app using GET method.

- /transactions: accepts a JSON payload with from, to and value fields, creates and signs a new Ethereum transaction using the provided from account and sends it to the Ethereum network using POST method.

- /balance/:account: returns the Ether balance of the specified Ethereum account using GET method.

## Getting started

- Clone this repo to your local machine.
- Generate your Infura private key.
- Get your wallet private key.
- Get your wallet Eth address to send and sign transaction with (the one you generated private key from).
- Get your receiver wallet Eth address (address to receive the Eth value you will be sending to).

## Running the app on your local machine

- Open your Vscode or IDE terminal.
- Clone this repo by pasting this code in your terminal: git clone https://github.com/pragmaticAweds/Kotani-Backend-Home-Take-Test.git
- switch to the repo directory: cd {part to the folder...}
- run this command to install dependencies: yarn install
- After running yarn, create a copy of the .env.example file and rename to .env.
- open your .env and paste in your env variables.

## Environment variables (.env)

```js
INFURA_KEY: Your Infura app to connect to ethereum network api key
SENDER_PRIVATE_KEY: The sender of transaction metamask private key
MONGODB_URI: Your mongodb url to connect with your database to store your datas.
SENDER_ADDRESS: The sender of transaction eth address (where the private_key is gotten)
RECEIVER_ADDRESS: The receiver of transaction eth address
INVALID_SENDER_ADDRESS: Some incorrect eth address.
```

## Authors

- [Jimoh Abdulafeez](pragmatic_aweds)

# Acknowledgements

- KOTANI
