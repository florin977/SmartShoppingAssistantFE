import { Box } from "@mui/material"
import "./App.css"
import NavBar from "./components/common/Navbar"
import { Route, Routes } from "react-router-dom"
import Categories from "./pages/Categories"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Promotions from "./pages/Promotions"
import NotFound from "./pages/NotFound"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"

function App() {
    return (
        <Box className="app">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/products" element={<Products />} />
                <Route path="/promotions" element={<Promotions />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Box>
    )
}

export default App
