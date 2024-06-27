# useTwelve

## Getting Started

To setup the project, install the required dependencies:

1. Install ts-node-dev globally with `npm install -g ts-node-dev`

2. Install yarn globally with `npm install -g yarn`

3. `yarn install` in both the `backend` and `frontend` folders

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

For the .env file you need 
```.env
EMAIL_PASSWORD="your email password"
EMAIL="your email"
NODE_TLS_REJECT_UNAUTHORIZED=0
SEARCH_WITHIN_PERIOD= 60 #60  which reps 1 HOUR 
REACT_APP_API_URL_="https://usetwelve.onrender.com"
```
## License

MIT
