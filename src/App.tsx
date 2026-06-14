import { Box } from "@mui/material"
import "./App.css"
import NavBar from "./components/common/Navbar"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import AdminCategories from "./pages/admin/AdminCategories"
import AdminProducts from "./pages/admin/AdminProducts"
import AdminPromotions from "./pages/admin/AdminPromotions"
import Shop from "./pages/Shop"
import CartProvider from "./contexts/CartContext/CartProvider"
import CartDrawer from "./components/CartDrawer"
import ProductPage from "./pages/ProductPage"
import MyReviews from "./pages/MyReviews"
import ProtectedRoute from "./components/common/ProtectedRoute"
import { WishlistProvider } from "./contexts/WishlistContext/WishlistProvider"
import WishlistPage from "./pages/MyWishlist"

function App() {
    return (
        <CartProvider>
            <WishlistProvider>
                <Box className="app">
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/admin/categories" element={<ProtectedRoute component={AdminCategories} requiredRole="Admin" />} />
                        <Route path="/admin/products" element={<ProtectedRoute component={AdminProducts} requiredRole="Admin" />} />
                        <Route path="/admin/promotions" element={<ProtectedRoute component={AdminPromotions} requiredRole="Admin" />} />
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/register" element={<Register />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/shop/:productId" element={<ProductPage />} />
                        <Route path="/reviews/:userId" element={<MyReviews />} />
                        <Route path="/wishlist" element={<WishlistPage />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <CartDrawer />
                </Box>
            </WishlistProvider>
        </CartProvider>
    )
}

export default App
