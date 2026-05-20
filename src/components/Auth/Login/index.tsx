import { Box, Button, Paper, TextField } from "@mui/material"
import "./Login.css"
import type { LoginCredentials } from "../../../types/auth/LoginCredentials"
import attemptLogin from "../../../services/LoginService"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
    const [email, setEmail] = useState("test@example.com")
    const [password, setPassword] = useState("LetMeIn")
    const [err, setErr] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setErr("")
        setIsLoading(true)

        try {
            const credentials: LoginCredentials = { email, password }
            const result = await attemptLogin(credentials)

            if (result === "OK") {
                console.log("Login successful")
                navigate("/")
            }
        } catch (err) {
            setErr(err instanceof Error ? err.message : String(err))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} className="login_box">
            <Paper elevation={3} className="login_paper">
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
            </Paper>
        </Box>
    )
}

export default Login
