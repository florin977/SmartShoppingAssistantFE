import React from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    CircularProgress,
    Alert,
    Box,
    Pagination
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
                sx={{ 
                    display: 'flex', 
                    alignItems: 'baseline', 
                    gap: 1.5,
                    fontWeight: 'bold' // <-- Moved to sx
                }}
            >
                My Wishlist
                {!isLoading && totalCount > 0 && (
                    <Typography 
                        variant="h5" 
                        component="span" 
                        color="text.secondary" // color is a native MUI prop, so it stays
                        sx={{ fontWeight: 'normal' }}
                    >
                        ({totalCount} {totalCount === 1 ? 'item' : 'items'})
                    </Typography>
                )}
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
            )}

            {items.length === 0 && !isLoading && !error ? (
                <Box sx={{ textAlign: "center", py: 10 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        Your wishlist is currently empty.
                    </Typography>
                    <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                        Continue Shopping
                    </Button>
                </Box>
            ) : (
                <>
                    <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
                        {items.map((item) => (
                            <Grid key={item.id} sx={{xs: 12, sm: 4, md: 3, lg: 3, display: "flex" }}>
                                <Card
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'transform 0.2s',
                                        '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={item.product?.imageUrl || 'https://via.placeholder.com/200'}
                                        alt={item.product?.name || 'Product image'}
                                        sx={{ 
                                            height: 160, // <-- Moved height to sx
                                            objectFit: 'contain', 
                                            p: 2, 
                                            bgcolor: '#f5f5f5' 
                                        }}
                                    />
                                    
                                    <CardContent 
                                        sx={{ 
                                            flexGrow: 1, 
                                            display: 'flex', 
                                            flexDirection: 'column', 
                                            alignItems: 'center', 
                                            textAlign: 'center' 
                                        }}
                                    >
                                        <Typography 
                                            gutterBottom 
                                            variant="subtitle1" 
                                            component="h2"
                                            sx={{
                                                fontWeight: 'bold', // <-- Moved to sx
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                lineHeight: 1.2,
                                                minHeight: '2.4em'
                                            }}
                                        >
                                            {item.product?.name}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Added: {new Date(item.addedAt).toLocaleDateString()}
                                        </Typography>
                                    </CardContent>

                                    <CardActions sx={{ flexDirection: 'column', px: 2, pb: 2, gap: 1 }}>
                                        <Button
                                            fullWidth
                                            size="small"
                                            variant="contained"
                                            startIcon={<ShoppingCartIcon />}
                                            disableElevation
                                            onClick={() => addItem(item.productId, 1)}
                                            sx={{ margin: '0 !important' }} 
                                        >
                                            Add to Cart
                                        </Button>
                                        
                                        <Button
                                            fullWidth
                                            size="small"
                                            color="error"
                                            onClick={() => removeFromWishlist(item.id)}
                                            sx={{ margin: '0 !important' }}
                                        >
                                            Remove
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {totalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
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