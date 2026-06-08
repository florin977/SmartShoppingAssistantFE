import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Pagination,
    Rating,
    Stack,
    Typography,
    Alert
} from "@mui/material";
import { useEffect, useState } from "react";
import type { UserReview } from "../../components/shared/types/Review";
import { ReviewsApi } from "../../api/clients/ReviewApiClient";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReviewFormDialog from "../../components/ReviewFormDialog";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { useAuth } from "../../contexts/AuthContext/AuthContext";

function MyReviews() {
    const { user, isLoading } = useAuth()
    const navigate = useNavigate()
    const { userId } = useParams()
    const pageSize = 3

    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState("")

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [count, setCount] = useState(0)

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedReview, setSelectedReview] = useState<UserReview | null>(null)

    const [reviews, setReviews] = useState<UserReview[]>([])

    useEffect(() => {
        if (isLoading) {
            return
        }
        
        if ((!user) || (user && user.id !== Number(userId))) {
            navigate("/")
        }
    }, [user, userId, navigate])

    function loadReviews(page: number) {
        ReviewsApi.getByUserId(Number(userId), { page, pageSize })
            .then((data) => {
                setReviews(data.items)
                setTotalPages(data.totalPages)
                setCount(data.totalCount)
            })
            .catch((e) => setErr((e as Error).message))
            .finally(() => setLoading(false))
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    };

    const handleEditClick = (review: UserReview) => {
        setSelectedReview(review)
        setIsFormOpen(true)
    };

    const handleDeleteClick = (review: UserReview) => {
        setSelectedReview(review)
        setIsDialogOpen(true)
    };

    useEffect(() => {
        if (Number(userId) == user?.id) {   
            loadReviews(page)
        }
    }, [page, user, userId])

    if (!user || user.id !== Number(userId)) {
        return null; 
    }

    return (
        <Container sx={{ py: 4 }} maxWidth="md">

            {err !== "" && (
                <Alert severity="error" sx={{ mb: 4 }}>
                    {err}
                </Alert>
            )}

            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" gutterBottom>
                    Your Reviews
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Manage the reviews you've written for our products.
                </Typography>
            </Box>

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : reviews.length === 0 ? (
                <Box sx={{ textAlign: "center", mt: 6, p: 4, backgroundColor: "background.paper", borderRadius: 2 }}>
                    <Typography variant="h6" color="textSecondary">
                        You haven't written any reviews yet.
                    </Typography>
                </Box>
            ) : (
                <>
                    <Stack spacing={3}>
                        {reviews.map((review) => (
                            <Card key={review.id} variant="outlined">
                                <CardContent>

                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                        <Typography
                                            variant="h6"
                                            component={Link}
                                            to={`/shop/${review.product?.id}`}
                                            sx={{
                                                textDecoration: "none",
                                                color: "text.primary",
                                                fontWeight: "bold",
                                                transition: "color 0.2s",
                                                "&:hover": {
                                                    color: "primary.main",
                                                    textDecoration: "underline"
                                                }
                                            }}
                                        >
                                            {review.product?.name || "Unknown Product"}
                                        </Typography>
                                        <Rating value={review.rating} readOnly size="small" />
                                    </Box>

                                    <Typography variant="caption" color="textSecondary" gutterBottom component="div" sx={{ mb: 2 }}>
                                        Posted on {new Date(review.postedAt).toLocaleDateString()}
                                        {review.updatedAt && (
                                            <span style={{ fontStyle: "italic", marginLeft: "8px" }}>
                                                (Updated: {new Date(review.updatedAt).toLocaleDateString()})
                                            </span>
                                        )}
                                    </Typography>

                                    <Typography variant="body1" sx={{ mb: 3 }}>
                                        "{review.text}"
                                    </Typography>

                                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleEditClick(review)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDeleteClick(review)}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>

                    {totalPages > 1 && (
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Box>
                    )}

                    {isFormOpen && (
                        <ReviewFormDialog review={selectedReview} productId={selectedReview?.product?.id ?? 0}
                            onClose={() => {
                                setIsFormOpen(false)
                                setSelectedReview(null)
                            }}
                            onSaved={() => {
                                setIsFormOpen(false)
                                setSelectedReview(null)

                                loadReviews(page)
                            }} />
                    )}

                    {isDialogOpen && (
                        <ConfirmDialog open={isDialogOpen}
                            title={"Delete review"}
                            description={"Are you sure you want to delete this review?"}
                            confirmLabel={"Delete Review"}
                            onConfirm={() => {
                                if (selectedReview) {
                                    ReviewsApi.deleteReview(selectedReview.id)
                                        .then(() => {
                                            setIsDialogOpen(false);
                                            setSelectedReview(null);
                                            setPage(1)
                                            loadReviews(1);
                                        })
                                        .catch((e) => {
                                            setErr((e as Error).message);
                                            setIsDialogOpen(false);
                                        });
                                } else {
                                    setIsDialogOpen(false)
                                }
                            }}
                            onCancel={() => {
                                setIsDialogOpen(false)
                            }} />
                    )}
                </>
            )
            }
        </Container>
    );
}

export default MyReviews;