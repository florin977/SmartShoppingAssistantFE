import React, { useEffect } from "react"
import { toUser, type User } from "../../components/shared/types/User"
import type { LoginCredentials } from "../../components/shared/types/AuthTypes"
import { AuthApiClient } from "../../api/clients/AuthApiClient"
import { UserApiClient } from "../../api/clients/UserApiClient"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "./auth-context"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<User | null>(null)
    const [isLoading, setIsLoading] = React.useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = toUser(await UserApiClient.getUser())
                setUser(user)
            } catch (error) {
                console.error(error)
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }
        fetchUser()
    }, [])

    const login = async (credentials: LoginCredentials) => {
        try {
            await AuthApiClient.login(credentials)

            const user = toUser(await UserApiClient.getUser())
            setUser(user)
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }

            if (error instanceof Error) {
                throw error;
            }

            throw new Error("An unexpected error occurred.");
        }
    }

    const logout = async () => {
        await AuthApiClient.logout()
        setUser(null)
        navigate("/")
    }

    const logoutAll = async () => {
        await AuthApiClient.logoutAll()
        setUser(null)
        navigate("/")
    }

    return (
        <AuthContext.Provider
            value={{ user, isLoading, login, logout, logoutAll }
            }>{children}
        </AuthContext.Provider>
    )
}