import { Alert, Box, Button, Paper, TextField } from "@mui/material"
import "./Login.css"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import type { LoginCredentials } from "../../../components/shared/types/AuthTypes"
import { useAuth } from "../../../contexts/AuthContext/auth-context"

function Login() {
    const [email, setEmail] = useState("test@example.com")
    const [password, setPassword] = useState("LetMeIn")
    const [err, setErr] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const { login } = useAuth()

    useEffect(() => {
        const penaltyUntil = localStorage.getItem("penaltyUntil");
        
        if (penaltyUntil) {
            if (parseInt(penaltyUntil, 10) > Date.now()) {
                navigate("/auth/slow-login");
            } else {
                localStorage.removeItem("penaltyUntil");
            }
        }
    }, [navigate]);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setErr("")
        setIsLoading(true)

        try {
            const credentials: LoginCredentials = { email, password }
            await login(credentials)

            navigate("/")
        } catch (err) {
            const errorMessage = ((err as Error).message)
            if (errorMessage.includes("Failed attempts:")) {
                // Split the string right at "Failed attempts: " to grab the number at the end
                const parts = errorMessage.split("Failed attempts: ");
                const attemptsStr = parts[1].trim();
                const attempts = parseInt(attemptsStr, 10);

                if (attempts >= 3) {
                    localStorage.setItem("penaltyUntil", (Date.now() + 15 * 60 * 1000).toString());
                    navigate("/auth/slow-login");
                } else {
                    setErr(`Invalid credentials. Attempts remaining: ${3 - attempts}`);
                }
            } else if (errorMessage.includes("Account is locked") || errorMessage.includes("Account locked")) {
                navigate("/auth/slow-login");
            } else {
                // Fallback for any other errors
                setErr(errorMessage);
            }
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
