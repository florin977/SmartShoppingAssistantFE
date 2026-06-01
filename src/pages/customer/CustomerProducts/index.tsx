import {
    Alert,
    Box,
    CircularProgress,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
} from "@mui/material"
import { useEffect, useState } from "react"
import type { Product } from "../../../components/shared/types/Product"
import { ProductsApi } from "../../../api/clients/ProductApiClient"

function CustomerProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    function loadProducts() {
        ProductsApi.getAll()
            .then((data) => {
                setProducts(data)
                setLoading(false)
                setError("")
            })
            .catch((err) => setError((err as Error).message))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {error !== "" && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {products.map((product) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    transition: "transform 0.2s",
                                    "&:hover": {
                                        transform: "scale(1.02)",
                                        boxShadow: 6,
                                    },
                                }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.imageUrl || "https://placehold.co/400x400?text=No+Image"}
                                    alt={product.name}
                                    sx={{ objectFit: "cover" }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h6" component="h2" noWrap>
                                        {product.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            mb: 2,
                                            display: "-webkit-box",
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}>
                                        {product.description}
                                    </Typography>
                                    <Typography variant="h5" color="primary.main" sx={{ fontWeight: "bold" }}>
                                        ${product.price.toFixed(2)}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ p: 2, pt: 0 }}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={() => console.log("Will be done in the next lab, trust")}>
                                        Add to Cart
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}

                    {products.length === 0 && (
                        <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
                            <Typography variant="h6" color="text.secondary">
                                No products available right now. Check back later!
                            </Typography>
                        </Box>
                    )}
                </Grid>
            )}
        </Container>
    )
}

export default CustomerProducts
