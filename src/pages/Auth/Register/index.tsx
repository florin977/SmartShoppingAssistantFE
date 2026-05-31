import { Alert, Box, Button, Paper, TextField } from "@mui/material"
import "./Register.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import type { RegisterCredentials } from "../../../components/shared/types/AuthTypes"
import { AuthApiClient } from "../../../api/clients/AuthApiClient"

function Register() {
    const [username, setUsername] = useState("Username")
    const [email, setEmail] = useState("your@email.com")
    const [password, setPassword] = useState("Password")
    const [err, setErr] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setErr("")
        setIsLoading(true)

        try {
            const credentials: RegisterCredentials = { username, email, password }
            await AuthApiClient.register(credentials)
            navigate("/auth/login")
        } catch (err) {
            setErr((err as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} className="register-box">
            <Paper elevation={3} className="register-paper">
                {err && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {err}
                    </Alert>
                )}
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
