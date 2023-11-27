# A - Node.js and Express
## REST
Representational State Transfer (REST) is an architectural style meant for building scalable web applications.

Within REST, there are singular things called resources, such as notes or phonebook in the case of our applications. Every resource has an associated URL which is the resource's unique address. The unique address can be achieved by using unique identifiers (IDS) at the base url of the data you want to retrieve.

There are different operations that can be used on resources:
- GET (fetches resources)
- POST (creates a new resource based on the request data)
- DELETE (removes the identified resource)
- PUT (replaces the entire identified resource with the request data)
- PATCH (replaces a part of the identified resource with the request data)

## Express
Express is a minimal and flexible web application framework for Node.js, providing a set of tools and features of building web and mobile applications. Express simplifies the process of creating servers, handling HTTP requests and managing routes 

Express allows you to define routes for your application, which tells the server how to respond to different requests. When using Axios for the frontend, it sends the request to the server and Express handles the request, which can be for example using mongoose to interact with a MongoDB database.

## The HTTP Standard 
### Safe 
- The request does not cause any side effects on the server (any database change as a result of request)

### Idempotent
- A request is idempotent if it does not generate side effects and contains the same result regardless of how many times the request is sent

There is nothing to check either of these, but rather people often use them in a way that meets these standards

## Middleware
Example: JSON-Parser
`app.use(express.json())`

We can create middlewares, which is just a way of modifying the request or response objects. An example of a middleware we can create is something that checks the routes, if a request is made to a non-existing route, we can throw an error.

`next()` is used to yield control to the next middleware

# B - Deploying App
## Same Origin Policy and CORS
A security mechanism implemented by browsers in order to prevent session hijacking among other security vulnerabilities. The resources being fetched must share the same origin (scheme, host, port).

CORS allows for legitimate cross-origin requests and can be used as a middleware by installing it and writing `app.use(cors())`

## Frontend Production Build
To deploy an application, we must create a production build using `npm run build`

This creates a directory called dist, containing the HTML: index.html and the folder assets consisting of a minified version of our applications JavaScript code.

## Serving Static Files in Backend
One option to deploy the frontend is to copy the productions build (the dist directory) to the root of the backend repository and configure the backend to show the frontend's main page (dist/index.html)

We can use express's built in middleware called static: `app.use(express.static('dist))`. This will check if the dist directory contains a file corresponding to the request's address, if it is found express will return it.

HTTP GET requests to the address www.serversaddress.com/index.html or www.serversaddress.com will show the React frontend, requests to www.serversaddress.com/api/persons will be handled by the backend.

The URL in the frontend baseURL can be converted to a relativeURL:
`const baseUrl = '/api/notes'`

# C - Saving Data to MongoDB
## MongoDB & Mongoose
In order to store data indefinitely, we need a database. We can use MongoDB which is a document database, like the Firestore database. The reason we use this is due to it's lower complexity compared to relational databases

The difference between document v. relation databases are in how they organize data and the query languages they support (document databases use NoSQL)

Mongoose is an object document/data mapper (ODM) library for MongoDB and Node.js. Moongose is often used as a platform to help interact with MongoDB databases, providing schema-based solutions to model application data and includes other features such as validation, query building, and middleware support. (findById, findByIdAndUpdate, etc.)

A schema is a way of telling the database how we want the data in an object to be stored in the database

## Verifying Frontend and Backend Integration
It is a good idea to always test the backend first, with the broswer, Postman, or the VS Code REST client. Once the backend has been verified, test the frontend works with the backend. It is highly inefficient otherwise to test the backend through the frontend

## Error Handling w/ Middleware
The code up to date has been written with an error handler for each code. This can be good sometimes, but there are cases where it is better to implement error handling in a single place

The `next()` function before was used to move onto the next route or middleware, but if it is given a parameter, then the execution will continue to the error handler middleware.

Express error handlers are middleware that are defined with a function which accepts four parameters.

```
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)
```

NOTE: The error handling middleware has to be passed as the last loaded middleware (app.use()) -- put at the bottom