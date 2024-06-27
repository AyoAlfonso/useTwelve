# useTwelve

## Getting Started

To setup the project, install the required dependencies:

1. Install yarn globally with `npm install -g yarn`

2. `yarn install` in both the `backend` and `frontend` folders

3. Run the backend and the frontend as shown below

---

To start the backend server

Run the seed script to populate the database with sample data:

```bash
cd backend
yarn install
yarn seed # This will create a new database and populate it with sample data (OPTIONAL)
yarn dev # This will start the backend server
```

To start the frontend app

```bash
cd frontend
yarn install
yarn start
```

Run the sync script whenever you need to sync the database schema:

## License

MIT
