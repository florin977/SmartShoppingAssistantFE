import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    TextField,
    Typography,
} from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import type { Product } from "../../components/shared/types/Product"
import { ProductsApi } from "../../api/clients/ProductApiClient"
import { AddShoppingCart } from "@mui/icons-material"
import { useCart } from "../../contexts/CartContext/cart-context"

function Shop() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [err, setError] = useState("")

    const [search, setSearch] = useState("")
    const { addItem } = useCart()

    const visibleProducts = useMemo(() => {
        return products.filter((product) =>
            product.name.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()),
        )
    }, [products, search])

    const handleAddToCart = async (product: Product) => {
        await addItem(product.id, 1)
    }

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
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}>
                <Typography variant="h4">Shop</Typography>
            </Box>
            <TextField
                label="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "grid",
                        gap: 2,
                        flexGrow: 1,
                        alignContent: "start",
                        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                    }}>
                    {visibleProducts.map((product) => (
                        <Card key={product.id} sx={{ display: "flex", flexDirection: "column" }}>
                            <CardMedia
                                component="img"
                                height="160"
                                image={product.imageUrl}
                                alt={product.name}
                                sx={{ objectFit: "cover" }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6">{product.name}</Typography>
                                <Typography variant="body2" color="textDisabled">
                                    {product.description}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ pt: 1 }}>
                                    {product.price} Ron
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<AddShoppingCart />}
                                    onClick={() => handleAddToCart(product)}>
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            )}
            {visibleProducts.length === 0 && (
                <Typography variant="h6" color="textDisabled">
                    No products found
                </Typography>
            )}
        </Container>
    )
}

export default Shop
