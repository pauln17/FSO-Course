import { useState } from "react"
import loginService from "../services/logins"
import blogService from "../services/blogs"

const Login = ({ setUser, setMessage }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'LoggedUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log("handleLogin error: ", exception)
            setMessage({
                text: `Invalid credentials`,
                type: 'fail'
            })
        }
        setTimeout(() => {
            setMessage({ text: '', type: '' })
        }, 5000)
    }

    return (
        <>
            <h3>Log In</h3>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )
}

export default Login