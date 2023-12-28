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