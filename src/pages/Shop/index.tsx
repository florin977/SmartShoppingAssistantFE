import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    Pagination,
    TextField,
    Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import type { Product } from "../../components/shared/types/Product"
import { ProductsApi } from "../../api/clients/ProductApiClient"
import { AddShoppingCart } from "@mui/icons-material"
import { useCart } from "../../contexts/CartContext/cart-context"
import type { ProductQuery } from "../../components/shared/types/ProductQuery"

function Shop() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [err, setError] = useState("")

    const [search, setSearch] = useState("")
    const [query, setQuery] = useState<ProductQuery>({ Page: 1, PageSize: 10 })
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

    const { addItem } = useCart()

    const handleAddToCart = async (product: Product) => {
        await addItem(product.id, 1)
    }

    function loadProducts(query: ProductQuery = {}) {
        ProductsApi.getFiltered(query)
            .then((data) => {
                setProducts(data)
                setLoading(false)
                setError("")
            })
            .catch((err) => setError((err as Error).message))
            .finally(() => setLoading(false))
    }

    function handleSearch(searchTerm: string) {
        setSearch(searchTerm)
        if (timer) {
            clearTimeout(timer)
        }

        const newTimer = setTimeout(() => {
            setQuery((prev) => ({
                ...prev,
                Search: searchTerm,
            }))
        }, 700)

        setTimer(newTimer)
    }

    function handlePagination(event: React.ChangeEvent<unknown>, page: number) {
        window.scrollTo({ top: 0, behavior: "smooth" })
        setQuery((prev) => ({
            ...prev,
            Page: page,
        }))
    }

    useEffect(() => {
        loadProducts(query)
    }, [query])

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
                onChange={(e) => handleSearch(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Box
                        sx={{
                            display: "grid",
                            gap: 2,
                            flexGrow: 1,
                            alignContent: "start",
                            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                        }}>
                        {products.map((product) => (
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
                    <Box>
                        <Pagination
                            count={100}
                            page={query.Page ?? 1}
                            onChange={handlePagination}
                            sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                        />
                    </Box>
                </>
            )}
            {products.length === 0 && (
                <Typography variant="h6" color="textDisabled">
                    No products found
                </Typography>
            )}
        </Container>
    )
}

export default Shop
