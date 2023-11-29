# A - Structure of Backend Application, Introduction to Testing
## Project Structure
By simplifying the index.js file through the usage of modules (node.js best practices), we allow for faster testing by making HTTP API calls rather than HTTP over the network.

A module dedicated to storing route handlers are called controllers, the only change is that at the top of the routes, we declare a new router object:
`const personsRouter = require('express').Router()` and export it with `module.exports = personsRouter`. We can also shorten the routes from `/api/persons/:id` to `/:id` in the controller and declare a relative route in the app.js file: `app.use('/api/persons', personsRouter)`

A router object is an isolated instance of middleware and routes -- a mini-application, capable of only performing middleware and routing functions.

Moreover, we can store files that handle middleware or logging commands to the console within a utils folder. 

## Testing Node Applications (JEST)
Jest is a testing library/test runner for JavaScript created by Facebook and is a dev dependency.

### Install
`npm install --save-dev jest`
### Scripts
`"test": "jest --verbose"`
### Configs
#### package.json
```
"jest": {
    "testEnvironment": "node"
}
```
#### .eslintrc.js
```
module.exports = {
    'env': {
        'jest': true
    }
}
```

We can define the functions we use for testing in the utils folder: utils/for_testing.js

In a separate folder named tests, we can define the test functions: tests/name.tests.js (.tests.js is required). In this file we can define tests. Furthermore, we can add tests within a describe block which allows us to group our tests in a category, making it clear in the console.

```
describe('test category name', () => {
    test('test name', () => {
        const a = []
        const result = testFunction(a)

        expect(result).toBe(0)
    })

    // other tests
})
```

## Lodash
Lodash is a JavaScript utility library that provides functions for common programming tasks related to working with arrays, objects, strings and functions. This allows for simplifying complex operations

# B - Testing Backend
