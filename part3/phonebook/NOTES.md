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
