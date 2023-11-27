### A - Node.js and Express
## REST
Representational State Transfer (REST) is an architectural style meant for building scalable web applications.

Within REST, there are singular things called resources, such as notes or phonebook in the case of our applications. Every resource has an associated URL which is the resource's unique address. The unique address can be achieved by using unique identifiers (IDS) at the base url of the data you want to retrieve.

There are different operations that can be used on resources:
- GET (fetches resources)
- POST (creates a new resource based on the request data)
- DELETE (removes the identified resource)
- PUT (replaces the entire identified resource with the request data)
- PATCH (replaces a part of the identified resource with the request data)

## The HTTP Standard 
# Safe 
- The request does not cause any side effects on the server (any database change as a result of request)

# Idempotent
- A request is idempotent if it does not generate side effects and contains the same result regardless of how many times the request is sent

There is nothing to check either of these, but rather people often use them in a way that meets these standards

## Middleware
Example: JSON-Parser
`app.use(express.json())`

We can create middlewares, which is just a way of modifying the request or response objects. An example of a middleware we can create is something that checks the routes, if a request is made to a non-existing route, we can throw an error.

`next()` is used to yield control to the next middleware

### B - Deploying App
# Same Origin Policy and CORS
A security mechanism implemented by browsers in order to prevent session hijacking among other security vulnerabilities. The resources being fetched must share the same origin (scheme, host, port).

CORS allows for legitimate cross-origin requests and can be used as a middleware by installing it and writing `app.use(cors())`

### C - Saving Data to MongoDB
# MongoDB & Mongoose
In order to store data indefinitely, we need a database. We can use MongoDB which is a document database, like the Firestore database. The reason we use this is due to it's lower complexity compared to relational databases

The difference between document v. relation databases are in how they organize data and the query languages they support (document databases use NoSQL)

Mongoose is an object document/data mapper (ODM) library for MongoDB and Node.js. Moongose is often used as a platform to help interact with MongoDB databases, providing schema-based solutions to model application data and includes other features such as validation, query building, and middleware support

A schema is a way of telling the database how we want the data in an object to be stored in the database

# Verifying Frontend and Backend Integration
It is a good idea to always test the backend first, with the broswer, Postman, or the VS Code REST client. Once the backend has been verified, test the frontend works with the backend. It is highly inefficient otherwise to test the backend through the frontend

# Error Handling w/ Middleware
The `next()` function before was used to move onto the next route or middleware, but if it is given a parameter, then the execution will continue to the error handler middleware.

NOTE: The error handling middleware has to be passed as the last loaded middleware (app.use()) -- put at the bottom