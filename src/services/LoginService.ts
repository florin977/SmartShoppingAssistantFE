import type { LoginCredentials } from "../types/auth/LoginCredentials"

async function attemptLogin(credentials: LoginCredentials) {
    const response = await fetch("https://localhost:7020/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
    })

    if (!response.ok) {
        throw new Error("Login failed")
    }

    return "OK"
}

export default attemptLogin
