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
import CustomerCategories from "./pages/customer/CustomerCategories"
import CustomerProducts from "./pages/customer/CustomerProducts"
import CustomerPromotions from "./pages/customer/CustomerPromotions"

function App() {
    return (
        <Box className="app">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin/categories" element={<AdminCategories />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/promotions" element={<AdminPromotions />} />
                <Route path="/categories" element={<CustomerCategories />} />
                <Route path="/products" element={<CustomerProducts />} />
                <Route path="/promotions" element={<CustomerPromotions />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Box>
    )
}

export default App
