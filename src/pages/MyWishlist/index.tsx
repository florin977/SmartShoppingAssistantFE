import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Button,
    CircularProgress,
    Alert,
    Box,
    Pagination,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useWishlist } from '../../contexts/WishlistContext/wishlist-context';
import { useCart } from '../../contexts/CartContext/cart-context';

export default function WishlistPage() {
    const {
        items,
        isLoading,
        error,
        page,
        totalPages,
        totalCount,
        setPage,
        removeFromWishlist
    } = useWishlist();

    const { addItem } = useCart();
    const navigate = useNavigate();

    function handleProductClick(productId: number) {
        navigate(`/shop/${productId}`);
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading && items.length === 0) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, fontWeight: 'bold' }}
            >
                My Wishlist
                {!isLoading && totalCount > 0 && (
                    <Typography variant="h5" component="span" color="text.secondary" sx={{ fontWeight: 'normal' }}>
                        ({totalCount} {totalCount === 1 ? 'item' : 'items'})
                    </Typography>
                )}
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {items.length === 0 && !isLoading && !error ? (
                <Box sx={{ textAlign: "center", py: 10 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        Your wishlist is currently empty.
                    </Typography>
                    <Button variant="outlined" color="primary" sx={{ mt: 2 }} onClick={() => navigate('/shop')}>
                        Continue Shopping
                    </Button>
                </Box>
            ) : (
                <>
                    <TableContainer component={Paper} variant="outlined" sx={{ mb: 4, borderRadius: 2 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="wishlist table">
                            <TableHead sx={{ bgcolor: 'background.default' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Added On</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {items.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        onClick={() => handleProductClick(item.productId)}
                                        sx={{
                                            height: 100,
                                            cursor: 'pointer',
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            '&:hover': { bgcolor: 'action.hover' }
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box
                                                    component="img"
                                                    src={item.product?.imageUrl || 'https://via.placeholder.com/100'}
                                                    alt={item.product?.name}
                                                    sx={{ width: 80, height: 80, objectFit: 'contain', bgcolor: '#f5f5f5', borderRadius: 1 }}
                                                />
                                                <Box>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                        {item.product?.name}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>

                                        <TableCell align="center" sx={{ color: 'text.secondary' }}>
                                            {new Date(item.addedAt).toLocaleDateString()}
                                        </TableCell>

                                        <TableCell align="center">
                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>

                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="medium"
                                                    startIcon={<AddShoppingCartIcon />}
                                                    disableElevation
                                                     onClick={(e) => {
                                                        e.stopPropagation();
                                                        addItem(item.productId, 1);
                                                    }}
                                                >
                                                    Add to Cart
                                                </Button>

                                                <IconButton
                                                    color="error"
                                                    aria-label="remove from wishlist"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFromWishlist(item.id);
                                                    }}
                                                    sx={{
                                                        bgcolor: 'error.light',
                                                        color: 'error.main',
                                                        '&:hover': { bgcolor: 'error.main', color: 'white' }
                                                    }}
                                                >
                                                    <FavoriteIcon />
                                                </IconButton>

                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {totalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                            />
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
}