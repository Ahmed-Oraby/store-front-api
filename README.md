# Storefront Backend API Project

## Setup Project

Create '.env' file in the root of the project,and add the following enviorment variables inside it :

-   POSTGRES_HOST: the host for the database
-   POSTGRES_DB: the name for the database
-   POSTGRES_USER: the user for postgres
-   POSTGRES_PASSWORD: the password for postgres
-   POSTGRES_TEST_DB: the name for the test database
-   ENV: the enviroment to run in, either 'dev' or 'test'
-   BCRYPT_PASSWORD: the pepper string used for bcrypt
-   SALT_ROUNDS: the salt rounds number used for bcrypt
-   TOKEN_SECRET: the secret string used for JWT

Edit 'database.json' file in the root of the project, with the following properties :

```json
{
	"dev": {
		"driver": "pg",
		"host": "REPLACE with the database host, for example: 127.0.0.1",
		"database": "REPLACE with the database name",
		"user": "REPLACE with the username for postgres",
		"password": "REPLACE with the password for postgres"
	},
	"test": {
		"driver": "pg",
		"host": "REPLACE with the database hose, for example: 127.0.0.1",
		"database": "REPLACE with the name of the test database",
		"user": "REPLACE with the username for postgres",
		"password": "REPLACE with the password for postgres"
	}
}
```

## Available scripts

### `yarn build`

Compiles the typescript files and output to '/build' directory.

**If you are using another 'tsconfig file' then make sure to edit the 'outDir' to './build'**

### `yarn test`

Run all tests on the test database using jasmine.

### `yarn start`

Start the development server using nodemon.

## Run the production server

### `node build/server`

Run the production server inside the '/build' folder.

## Accessible endpoints

**Assuming that the server runs on localhost (127.0.0.1) and port 3000**

-   'localhost:3000/api/users' --> The API endpoint for CRUD operations on users

-   'localhost:3000/api/products' --> The API endpoint for CRUD operations on products

-   'localhost:3000/api/orders' --> The API endpoint for CRUD operations on oerders

## Usage

-   Install all dependencies using npm or yarn.

-   Create the database using psql.

-   Add all the required enviroment variables inside '.env' as described above.

-   Edit all the required properties inside 'database.json' as described above.

-   Run 'db-migrate up' to run all migrations on the database.

-   Run `yarn start` to start the development server.

-   Now you have the proper schema on the database, you can start using the API endpoints as describes inside 'Requirements.md'.
