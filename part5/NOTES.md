# A - Frontend Login
## Proxy
A proxy is used to connect the backend from part 4 with the frontend from part 5 that was created using Vite.

Vite allows us to do so easily, by setting the vite.config.js file like so:
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },
})
```

## Storing Data Locally
To prevent data from being wiped when the user refreshes the browser, we can store it locally in the browser using 
```
window.localStorage.setItem(
    'LoggedUser', JSON.stringify(user)
)
```
and retrieved via:
```
const userJSON = window.localStorage.getItem('LoggedUser')
const user = JSON.parse(userJSON)

```

## User Token
When creating a user, a token is not automatically created. However, when logging in a user, most systems nowadays automatically create a token. This can be retrieved and sent in the request as a custom header:

```
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { setToken, create}
```

# B - Props, Children and Prototypes
## props.children
A component can contain other components or elements and is automatically added by React as children. For example:
```
<Test>
    // ...another component
    // ...div
</Test>
```

The props.children is now an array that contains the children of the Test component. If there was no corresponding closing tag, then the props.children array would be empty.

The children can then be extracted within the actual component itself and display such as through `{props.children}`

## State of the Forms
When we want the state of two components to always change together, remove state from both of them and move it to their common closest parent and pass it down to them via props. This is known as lifting state up and is a common practice when writing React code.

## Reference Hooks
useRef, forwardRef and useImperativeHandle are three React hooks that are often used in conjunction to work with references in functional components.

useRef creates a mutable object called a ref object, which has a current property. The current property can be assigned any value, and it persists between renders. It's commonly used for accessing and interacting with the DOM directly or for persisting values across renders without causing a re-render.

forwardRef is a higher-order component that allows you to pass a ref down to a child component. It is useful when you need to access or manage the state of a child component from its parent.

useImperativeHandle customizes the instance value that is exposed when using forwardRef. It allows you to specify what values or methods should be accessible on the ref object passed to the parent component.

## Prop Types
We can define the type of a prop and whether it is required or not using the `prop-types` library.

An example:
```
import PropTypes from 'prop-types'

const Blog = ({ blog, setBlogs, user }) => {
 // ...
}

Blog.propTypes = {
  blog: PropTypes.shape({
    // Define the structure of the 'blog' object
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired, // Assuming 'user' is an object
  }).isRequired,
  // Define the setBlogs function
  setBlogs: PropTypes.func.isRequired,
  // Define the structure of the 'user' object
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
}
```

# C - Testing React Apps
In addition to Jest, we require another testing library to help us render components for testing purposes. This can be achieved using `react-testing-library`.

Installalation: `npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom @babel/preset-env @babel/preset-react`

The files package.json should be extended:
```
{
  "scripts": {
    // ...
    "test": "jest"
  }
  // ...
  "jest": {
    "testEnvironment": "jsdom"
  }
}
```
and .babelrc should be added:
```
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
```

Usage:
```
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})
```

With this method, React components which are normally rendered to the DOM, this allows us to test components without the need to render to the DOM.