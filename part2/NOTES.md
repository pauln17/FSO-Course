# C - Getting Data from Server
## JSON Server
A JSON server can be installed globally on your machine using `npm install -g json-server`

Create a file named db.json storing the data we can run the server by typing:
`json-server --port 3001 --watch db.json`

# Axios and Promises
Axios is a JavaScript library used to make HTTP requests from the browser. Axios is built on top of JavaScript promises, allowing for easy handling of asynchronous operations, making it straightforward to work with data that is fetched or sent over the network.

A promise is an object representing the eventual completion of failure of an asynchronous operation. There are three states:
- Pending: the final value is not available yet
- Promise: the operation has been completed and the final value is available, which generally is a successful operation, sometimes called resolved
- Rejected: an error prevented the final value from being determined, which generally represents a failed operation


