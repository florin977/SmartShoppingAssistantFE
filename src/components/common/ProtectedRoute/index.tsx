import { CircularProgress, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext/AuthContext"
import type { RoleType } from "../../shared/types/AuthTypes"
import { useEffect } from "react"

interface ProtectedRouteProps {
    component: React.ComponentType<any>
    requiredRole: RoleType
}

export default function ProtectedRoute({ component: Component, requiredRole }: ProtectedRouteProps) {
    const { user, isLoading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading) {
            if (!user || user.role !== requiredRole) {
                navigate("/")
            }
        }
    }, [isLoading, user, requiredRole, navigate])

    if (isLoading) {
        return (
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <CircularProgress />
            </Box>
        )
    }

    if (!user || user.role !== requiredRole) {
        return null
    }

    return <Component />
}
