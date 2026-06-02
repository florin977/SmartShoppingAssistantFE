import React, { useEffect } from "react"
import { toUser, type User } from "../../components/shared/types/User"
import type { LoginCredentials } from "../../components/shared/types/AuthTypes"
import { AuthApiClient } from "../../api/clients/AuthApiClient"
import { UserApiClient } from "../../api/clients/UserApiClient"
import { useNavigate } from "react-router-dom"

interface AuthContextType {
    user: User | null
    isLoading: boolean
    login: (credentials: LoginCredentials) => Promise<void>
    logout: () => Promise<void>
    logoutAll: () => Promise<void>
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = React.createContext<AuthContextType | null>(null)

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
        await AuthApiClient.login(credentials)

        const user = toUser(await UserApiClient.getUser())
        setUser(user)
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
    return <AuthContext.Provider value={{ user, isLoading, login, logout, logoutAll }}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = React.useContext(AuthContext)

    if (context === null) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}
