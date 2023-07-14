# Express Rest API

## 🚀Installation
- Clone this repository
  - `git clone https://github.com/Yadija/express-rest-api-postgresql.git`
- Install dependencies
  - `npm install`

## 📝Setup Environment
- Create a `.env` file and copy the code below
```
# SERVER configuration
HOST=<hostname (e.g localhost)>
PORT=<port (e.g 5000)>

# NODE_POSTGRES configuration
PGUSER=<postgres user (e.g developer)>
PGHOST=<postgres host (e.g localhost)>
PGPASSWORD=<postgres password (e.g secretpassword)>
PGDATABASE=<postgres database (e.g express_restapi)>
PGPORT=<postgres port (e.g 5432)>

# TOKENIZE
ACCESS_TOKEN_KEY=<random string>
REFRESH_TOKEN_KEY=<random string>
ACCESS_TOKEN_AGE=<(e.g 10m)>
```
  #### Note: `random strings must be different from each other`
- Create random strings with node
  - `node`
  - `require('crypto').randomBytes(64).toString('hex');`
  - `.exit` to exit

## 📄Setup Database
- Create a postges database named `express_restapi`
- Migration
  - `npm run migrate up`

## 🔭Running App
- Running API
  - `npm start`