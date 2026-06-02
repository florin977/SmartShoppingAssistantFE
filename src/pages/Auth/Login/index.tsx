import { Alert, Box, Button, Paper, TextField } from "@mui/material"
import "./Login.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import type { LoginCredentials } from "../../../components/shared/types/AuthTypes"
import { useAuth } from "../../../contexts/AuthContext/AuthContext"

function Login() {
    const [email, setEmail] = useState("test@example.com")
    const [password, setPassword] = useState("LetMeIn")
    const [err, setErr] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const { login } = useAuth()

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setErr("")
        setIsLoading(true)

        try {
            const credentials: LoginCredentials = { email, password }
            await login(credentials)

            navigate("/")
        } catch (err) {
            setErr((err as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} className="login-box">
            <Paper elevation={3} className="login-paper">
                {err && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {err}
                    </Alert>
                )}
                <TextField
                    id="email"
                    label="E-mail"
                    variant="standard"
                    defaultValue="test@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="standard"
                    defaultValue="LetMeIn"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Login"}
                </Button>
                <Box className="login-register-link">
                    No account? <Link to="/auth/register">Register here</Link>
                </Box>
            </Paper>
        </Box>
    )
}

export default Login
