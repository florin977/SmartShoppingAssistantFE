import { Box, Typography, Button, Container, Stack, Paper } from "@mui/material"
import { useAuth } from "../../contexts/AuthContext/auth-context"
import { Link } from "react-router-dom"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"

function Home() {
    const { user } = useAuth()

    return (
        <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
            
            {/* --- Hero Section --- */}
            <Box sx={{ mb: 8 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to Smart Shopping Assistant
                </Typography>
                
                <Typography variant="h5" color="textSecondary" sx={{ mb: 4 }}>
                    Hello, {user ? user.username : "Guest"}! Find exactly what you need, read verified reviews, and check out with ease.
                </Typography>

                <Stack direction="row" spacing={3} sx={{justifyContent: "center"}}>
                    <Button 
                        component={Link} 
                        to="/shop" 
                        variant="contained" 
                        size="large" 
                        startIcon={<ShoppingBagIcon />}
                        sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}
                    >
                        Browse Products
                    </Button>

                    {/* Show a login button only if the user is a guest */}
                    {!user && (
                        <Button 
                            component={Link} 
                            to="/auth/login" 
                            variant="outlined" 
                            size="large"
                            sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}
                        >
                            Sign In
                        </Button>
                    )}
                </Stack>
            </Box>

            {/* --- Simple Info / Features Section --- */}
            <Paper elevation={2} sx={{ p: 4, mt: 4, backgroundColor: "background.default" }}>
                <Typography variant="h5" gutterBottom>
                    Why shop with us?
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    We bring you the best deals, an easy-to-use cart system, and an active community of reviewers to help you make the smartest purchasing decisions.
                </Typography>
            </Paper>

        </Container>
    )
}

export default Home