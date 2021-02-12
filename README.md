# user-crud-eb-backend

The backend uses JWT, implemented in both cookies and bearer token to accomondate for generic API and browser based access.

MongoDB standard vanilla installation.

The main libraries used:
- Mongoose
- JWT webtoken
- Password hashing
- Cookie parser

## Getting started
	npm install
	npm start

## Settings
DB and password hashing are in config/db. By default they are:

	port: process.env.PORT || 3000,
	jwtSecret: process.env.JWT_SECRET || 'secret',
	mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/user_crud'

## Postman collection
The APIs can be view and tested using the PostMan collection export:
- user-crud-2.postman_collection.json
