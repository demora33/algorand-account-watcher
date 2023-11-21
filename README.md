# Algorand Account Watcher

The Algorand Account Watcher is a simple REST API designed to add Algorand account addresses to a "watcher" list. It periodically checks the state of each account in the watcher list, logs notifications for changes in account balances, and provides an endpoint to list tracked accounts and their states. This project is created to support multiple watchlists.

## Features

- **Create Watchlist:** POST endpoint to create a watchlist.

- **Add Account to Watchlist:** POST endpoint to add an account to a specific watchlist.

- **List Tracked Accounts:** GET endpoint to retrieve the state of all accounts in a given watchlist.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/demora33/algorand-account-watcher.git
   cd algorand-account-watcher
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   MONGODB_URI=your-mongodb-uri
   ALGONODE_TESTNET_URL=your-algorand-node-api-url
   ```

## Usage

1. Start the application:

   ```bash
   npm run start
   ```

2. Use the provided endpoints to create watchlists, add accounts, and list tracked accounts.

## Endpoints

1. **Create a Watchlist:**

   ```bash
   curl -X POST http://localhost:3000/watchlist/create -H "Content-Type: application/json" -d '{"watchlistName": "my-first-watchlist"}'
   ```

2. **Add an Account to the Watchlist:**

   ```bash
   curl -X POST http://localhost:3000/watchlist/add/ -H "Content-Type: application/json" -d '{"account": "algorand-account-address"}'
   ```

3. **Get the State of Accounts in a Watchlist (Replace `655c92868f8c3740c17066c4` with the actual watchlist ID):**
   ```bash
   curl http://localhost:3000/watchlist/accounts/655c92868f8c3740c17066c4
   ```

Ensure that the server is running and replace any details as needed based on your specific configuration and requirements.

- **Create Watchlist:**

  - **Endpoint:** `POST /watchlist/create`
  - **Request Body:**
    ```json
    {
      "name": "Your Watchlist Name"
    }
    ```
  - **Response:**
    ```json
    {
      "name": "Your Watchlist Name",
      "accounts": [],
      "_id": "xxxxx",
      "createdAt": "2023-11-21T13:48:02.510Z",
      "updatedAt": "2023-11-21T13:48:02.510Z",
      "__v": 0
    }
    ```

- **Add Account to Watchlist:**

  - **Endpoint:** `POST /watchlist/add/:watchlistId`
  - **Request Body:**
    ```json
    {
      "account": "Algorand Account Address"
    }
    ```

- **List Tracked Accounts:**
  - **Endpoint:** `GET /watchlist/:watchlistId`
  - **Response:**
    ```json
    {
      "accounts": [
        {
          "account": "Algorand Account Address",
          "state": "Account State"
        }
        // Additional accounts...
      ]
    }
    ```

Feel free to explore and enhance the functionalities according to your needs. Happy coding!

---

Make sure to replace "your-username" in the GitHub clone URL, and customize the environment variables in the `.env` file with your MongoDB URI and Algorand node API URL.

## Technology Stack

- [NestJS](https://nestjs.com/): A progressive Node.js framework for building efficient and scalable server-side applications.
- [AlgoNode.io](https://algonode.io/): Algorand Node API for interacting with the Algorand blockchain (use testnet).
- [MongoDB](https://www.mongodb.com/): NoSQL database for storing watchlists and account information.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/algorand-account-watcher.git
   ```

2. Install dependencies:

   ```bash
   cd algorand-account-watcher
   npm install
   ```

3. Configure MongoDB:

   - Update the MongoDB connection details in the `src/config/database.config.ts` file.

4. Run the application:

   ```bash
   npm run start
   ```

5. Access the API at `http://localhost:3000`.

## Endpoints

- **Add Algorand Address:**

  - `POST /watchlist/add`
  - Body: `{ "address": "ALGORAND_ADDRESS" }`

- **List Tracked Accounts:**
  - `GET /watchlist/list`

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
