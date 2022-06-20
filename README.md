# EPAM-CRUD-NODEJS
This project show how can interract with the `http` module in Node.js. Simple example CRUD API.

As tests library used `vitest`

As database use `in-memory` storage

Also cluster mode have not shared memory. Each process have self storage.

## Installation instructions

1. Clone this repo
2. Switch to the `dev` branch
3. Setup your `.env` file
4. Run application as `npm run start:prod`

## Running modes

You can use three modes

`start:dev` - for development
`start:prod` - for compile project and start in production
`start:multi` - for run multi instances of server