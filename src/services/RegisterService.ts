import type { RegisterCredentials } from "../types/auth/RegisterCredentials"

async function attemptRegister(credentials: RegisterCredentials): Promise<JSON> {
    const response = await fetch("https://localhost:7020/api/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    })

    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || "Failed to register")
    }

    const data = await response.json()
    return data
}

export default attemptRegister
