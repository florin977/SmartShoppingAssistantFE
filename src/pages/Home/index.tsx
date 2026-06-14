import {
    Box,
    Typography,
    Button,
    Container,
    Stack,
    Card,
    Chip,
    TextField,
    InputAdornment,
} from "@mui/material"
import { alpha } from "@mui/material/styles"
import { useAuth } from "../../contexts/AuthContext/auth-context"
import { Link } from "react-router-dom"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined"
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined"
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"
import StarIcon from "@mui/icons-material/Star"

const features = [
    {
        icon: AutoAwesomeOutlinedIcon,
        title: "AI-powered picks",
        description: "Get recommendations tailored to what you actually buy, not just what's trending.",
        color: "primary",
    },
    {
        icon: ReviewsOutlinedIcon,
        title: "Verified reviews",
        description: "Real feedback from real buyers, so you know exactly what you're getting.",
        color: "secondary",
    },
    {
        icon: LocalShippingOutlinedIcon,
        title: "Fast, secure checkout",
        description: "Save your details once and check out in seconds, every time.",
        color: "info",
    },
]

function Home() {
    const { user } = useAuth()

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
            {/* --- Hero Section --- */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: { xs: 6, md: 8 },
                    mb: { xs: 10, md: 14 },
                }}
            >
                <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
                    <Chip
                        icon={<AutoAwesomeOutlinedIcon />}
                        label={user ? `Welcome back, ${user.username}` : "Welcome, guest"}
                        color="secondary"
                        variant="outlined"
                        sx={{ mb: 3 }}
                    />

                    <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
                        Shop smarter with{" "}
                        <Box component="span" sx={{ color: "primary.main" }}>
                            AI-powered
                        </Box>{" "}
                        picks
                    </Typography>

                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 480 }}>
                        Find exactly what you need, read verified reviews, and check out with ease.
                    </Typography>

                    <TextField
                        placeholder="Search for products..."
                        fullWidth
                        sx={{ mb: 4, maxWidth: 420 }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchOutlinedIcon sx={{ color: "text.secondary" }} />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
                    >
                        <Button
                            component={Link}
                            to="/shop"
                            variant="contained"
                            size="large"
                            startIcon={<ShoppingBagIcon />}
                            sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}
                        >
                            Browse products
                        </Button>
                        {!user && (
                            <Button
                                component={Link}
                                to="/auth/login"
                                variant="outlined"
                                size="large"
                                sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}
                            >
                                Log in
                            </Button>
                        )}
                    </Stack>
                </Box>

                {/* Decorative "AI pick" preview card, hidden on small screens */}
                <Box sx={{ flex: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
                    <Card sx={{ p: 3, width: 280 }}>
                        <Chip
                            icon={<AutoAwesomeOutlinedIcon sx={{ fontSize: 16 }} />}
                            label="AI pick for you"
                            size="small"
                            sx={{
                                mb: 2,
                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
                                color: "primary.main",
                                fontWeight: 600,
                            }}
                        />
                        <Box
                            component="img"
                            src="https://placehold.co/400x400?text=Smartwatch"
                            alt="Smartwatch"
                            sx={{
                                width: "100%",
                                height: 140,
                                borderRadius: 2,
                                objectFit: "cover",
                                mb: 2,
                            }}
                        />
                        <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                            Smart Fitness Watch
                        </Typography>
                        <Stack direction="row" spacing={0.5} sx={{alignItems:"center", mb: 1 }}>
                            {[...Array(4)].map((_, i) => (
                                <StarIcon key={i} sx={{ fontSize: 16, color: "secondary.main" }} />
                            ))}
                            <StarIcon sx={{ fontSize: 16, color: "action.disabled" }} />
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                                (1,024)
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} sx={{alignItems: "baseline"}}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                199.99 Ron
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ textDecoration: "line-through" }}
                            >
                                259.99 Ron
                            </Typography>
                        </Stack>
                    </Card>
                </Box>
            </Box>

            {/* --- Features Section --- */}
            <Typography variant="h4" sx={{ fontWeight: 600, textAlign: "center", mb: { xs: 4, md: 6 } }}>
                Why shop with us
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                    gap: 3,
                }}
            >
                {features.map(({ icon: Icon, title, description, color }) => (
                    <Card key={title} sx={{ p: 3, textAlign: "left" }}>
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                                color: `${color}.main`,
                                mb: 2,
                            }}
                        >
                            <Icon />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    </Card>
                ))}
            </Box>
        </Container>
    )
}

export default Home