import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Pagination,
    Rating,
    Stack,
    Typography,
} from "@mui/material"
import { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import type { Product } from "../../components/shared/types/Product"
import { ProductsApi } from "../../api/clients/ProductApiClient"
import type { ProductReview } from "../../components/shared/types/Review"
import { useCart } from "../../contexts/CartContext/cart-context"
import { ReviewsApi } from "../../api/clients/ReviewApiClient"

function ProductPage() {
    const { productId } = useParams()
    const { addItem } = useCart()
    const [loading, setLoading] = useState(true)
    const [loadingReviews, setLoadingReviews] = useState(false)
    const [err, setErr] = useState("")
    const [product, setProduct] = useState<Product | null>(null)
    const [reviews, setReviews] = useState<ProductReview[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const pageSize = 3

    const loadProduct = useCallback((id: number) => {
        setLoading(true)
        setErr("")

        ProductsApi.getById(id)
            .then((data) => setProduct(data))
            .catch((e) => setErr((e as Error).message))
            .finally(() => setLoading(false))
    }, [])

    const loadReviews = useCallback(
        (id: number, pageNum: number) => {
            setLoadingReviews(true)
            ReviewsApi.getByProductId(id, { page: pageNum, pageSize })
                .then((data) => {
                    setReviews(data.items)
                    setTotalPages(data.totalPages)
                })
                .catch((e) => setErr((e as Error).message))
                .finally(() => {
                    setLoadingReviews(false)
                })
        },
        [pageSize],
    )

    useEffect(() => {
        const id = Number(productId)
        if (id) {
            loadProduct(id)
            loadReviews(id, 1)
            setPage(1)
        }
    }, [productId, loadProduct, loadReviews])

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
        const id = Number(productId)
        if (id) {
            loadReviews(id, value)
        }
    }

    return (
        <Container sx={{ py: 4 }}>
            {err !== "" && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {err}
                </Alert>
            )}

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {/* --- Product Details Section --- */}
                    <Grid container spacing={6}>
                        {/* Left Column: Image */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                component="img"
                                src={product?.imageUrl}
                                alt={product?.name}
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    objectFit: "cover",
                                }}
                            />
                        </Grid>

                        {/* Right Column: Info & Actions */}
                        <Grid
                            size={{ xs: 12, md: 6 }}
                            sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Typography variant="h3" gutterBottom>
                                {product?.name}
                            </Typography>

                            <Typography variant="h4" color="primary" gutterBottom>
                                ${product?.price.toFixed(2)}
                            </Typography>

                            <Typography variant="body1" color="textDisabled" sx={{ mb: 4 }}>
                                {product?.description}
                            </Typography>

                            <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                sx={{ py: 1.5, fontSize: "1.1rem", width: { xs: "100%", sm: "50%" } }}
                                onClick={() => addItem(product?.id ?? 0, 1)}>
                                Add to Cart
                            </Button>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 8 }} />

                    {/* --- Reviews Section --- */}
                    <Box>
                        <Typography variant="h4" gutterBottom>
                            Customer Reviews
                        </Typography>

                        {loadingReviews ? (
                            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                                <CircularProgress size={30} />
                                <Typography sx={{ ml: 2 }}>Loading reviews...</Typography>
                            </Box>
                        ) : reviews.length === 0 ? (
                            <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                                No reviews yet. Be the first to review this product!
                            </Typography>
                        ) : (
                            <>
                                <Stack spacing={3} sx={{ mt: 2 }}>
                                    {reviews.map((review) => (
                                        <Card key={review.id} variant="outlined">
                                            <CardContent>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        mb: 1,
                                                    }}>
                                                    <Typography variant="subtitle1">{review.user.username}</Typography>
                                                    <Rating value={review.rating} readOnly size="small" />
                                                </Box>
                                                <Typography variant="caption" color="textSecondary" gutterBottom>
                                                    {new Date(review.postedAt).toLocaleDateString()}
                                                </Typography>
                                                <Typography variant="body1" sx={{ mt: 1 }}>
                                                    "{review.text}"
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Stack>

                                {totalPages > 1 && (
                                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                                        <Pagination
                                            count={totalPages}
                                            page={page}
                                            onChange={handlePageChange}
                                            color="primary"
                                        />
                                    </Box>
                                )}
                            </>
                        )}
                    </Box>
                </>
            )}
        </Container>
    )
}

export default ProductPage
