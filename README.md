# Algorand Account Watcher

## Overview

The Algorand Account Watcher is a simple REST API designed to allow users to add Algorand account addresses to a "watcher" list. It periodically checks the state of each account in the watcher list, logs notifications for changes in account balances, and provides an endpoint to list tracked accounts and their states.

## Features

1. **Accepting an Algorand Address:**
   - Create a REST API endpoint to add an Algorand account address to the watcher list.

2. **Periodic State Check:**
   - Implement a CRON mechanism that checks the state of each account in the watcher list every 60 seconds.

3. **Logging Notifications:**
   - Log notifications whenever a change in the balance of a watched account is detected.

4. **Listing Tracked Accounts:**
   - Provide a REST API endpoint to list all tracked accounts and their current states.

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