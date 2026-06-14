import { type User } from "../../components/shared/types/User"
import type { LoginCredentials } from "../../components/shared/types/AuthTypes"
import React from "react"

interface AuthContextType {
    user: User | null
    isLoading: boolean
    login: (credentials: LoginCredentials) => Promise<void>
    logout: () => Promise<void>
    logoutAll: () => Promise<void>
}

export const AuthContext = React.createContext<AuthContextType | null>(null)

export const useAuth = () => {
    const context = React.useContext(AuthContext)

    if (context === null) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}
