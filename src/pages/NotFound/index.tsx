import {
    Box,
    Typography,
    Button,
    Stack,
    TextField,
    InputAdornment,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";

function NotFound() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                bgcolor: "background.default",
                px: 3,
                py: 8,
            }}
        >
            <RemoveShoppingCartOutlinedIcon
                sx={{ fontSize: 48, color: "secondary.main", mb: 2, opacity: 0.9 }}
            />

            <Typography
                sx={{
                    fontSize: { xs: "4.5rem", sm: "6.5rem" },
                    fontWeight: 700,
                    color: "primary.main",
                    lineHeight: 1,
                }}
            >
                404
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 600, mt: 1 }}>
                This page is out of stock
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 1.5, mb: 4, maxWidth: 420 }}
            >
                We looked on every shelf, but the page you're after has been moved,
                renamed, or never existed.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button href="/" variant="contained" color="primary" size="large">
                    Back to home
                </Button>
                <Button href="/shop" variant="outlined" color="primary" size="large">
                    Browse products
                </Button>
            </Stack>
        </Box>
    );
}

export default NotFound;