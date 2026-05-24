import { Box, Button, Paper, TextField } from "@mui/material"
import "./Register.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import type { RegisterCredentials } from "../../../types/auth/RegisterCredentials"
import attemptRegister from "../../../services/RegisterService"

function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setErr("")
        setIsLoading(true)

        try {
            const credentials: RegisterCredentials = { username, email, password }
            const result = await attemptRegister(credentials)

            console.log(result)
            navigate("/auth/login")
        } catch (err) {
            setErr(err instanceof Error ? err.message : String(err))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} className="register-box">
            <Paper elevation={3} className="register-paper">
                <TextField
                    id="username"
                    label="Username"
                    variant="standard"
                    defaultValue="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    id="email"
                    label="E-mail"
                    variant="standard"
                    defaultValue="your@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="standard"
                    defaultValue="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Register"}
                </Button>
                <Box className="login-register-link">
                    Have an account? <Link to="/auth/login">Login here</Link>
                </Box>
            </Paper>
        </Box>
    )
}

export default Register
