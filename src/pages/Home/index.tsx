import { Box, Typography } from "@mui/material"
import { useAuth } from "../../contexts/AuthContext/AuthContext"

function Home() {
    const { user } = useAuth()

    return (
        <Box>
            <Typography variant="h1">Welcome to Smart Shopping Assistant, {user ? user.username : "Guest"}</Typography>
        </Box>
    )
}

export default Home
