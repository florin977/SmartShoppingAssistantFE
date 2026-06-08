import { AppBar, Avatar, Badge, Box, Button, IconButton, Toolbar, Typography, Menu } from "@mui/material"
import { Link, NavLink } from "react-router-dom"
import "./NavBar.css"
import logo from "../../../assets/logo.png"
import { useAuth } from "../../../contexts/AuthContext/AuthContext"
import { useCart } from "../../../contexts/CartContext/cart-context"
import { ShoppingCart } from "@mui/icons-material"
import { useState } from "react"

function NavBar() {
    const { user, logout, logoutAll } = useAuth()
    const { cart, openCart } = useCart()
    const [avatarElement, setAvatarElement] = useState<HTMLElement | null>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function handleAvatarClick(event: React.MouseEvent<HTMLButtonElement>) {
        if (!isMenuOpen) {
            setIsMenuOpen(true)
            setAvatarElement(event.currentTarget)
        } else {
            setIsMenuOpen(false)
            setAvatarElement(null)
        }
    }

    function handleLogout() {
        setAvatarElement(null)
        setIsMenuOpen(false)
        logout()
    }

    function handleLogoutAll() {
        setAvatarElement(null)
        setIsMenuOpen(false)
        logoutAll()
    }

    return (
        <AppBar className="main-appbar" position="static">
            <Toolbar sx={{ justifyContent: "space-between", padding: "0 !important" }}>
                <Box className="nav-island">
                    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                        <Box component="img" src={logo} alt="Smart Shopping Assistant Logo" sx={{ height: 32 }} />
                    </Link>
                </Box>

                <Box className="nav-island">
                    <Button className="navbar-btn" component={NavLink} to="/" variant="text">
                        Home
                    </Button>
                    {user?.role === "Admin" ? (
                        <>
                            <Button className="navbar-btn" component={NavLink} to="/admin/categories" variant="text">
                                Categories
                            </Button>
                            <Button className="navbar-btn" component={NavLink} to="/admin/products" variant="text">
                                Products
                            </Button>
                            <Button className="navbar-btn" component={NavLink} to="/admin/promotions" variant="text">
                                Promotions
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button className="navbar-btn" component={NavLink} to="/shop" variant="text">
                                Shop
                            </Button>
                        </>
                    )}
                </Box>

                <Box className="nav-island">
                    {user === null ? (
                        <Button className="navbar-btn-login" component={NavLink} to="/auth/login" variant="text">
                            Login
                        </Button>
                    ) : (
                        <>
                            {user?.role === "Customer" && (
                                <IconButton color="inherit" onClick={openCart} sx={{ ml: 1 }}>
                                    <Badge badgeContent={cart?.itemCount ?? 0} color="primary">
                                        <ShoppingCart />
                                    </Badge>
                                </IconButton>
                            )}
                            <IconButton sx={{ p: 0, ml: 1, mr: 1 }} onClick={handleAvatarClick}>
                                <Avatar>{user?.username[0] + user?.username[1]}</Avatar>
                            </IconButton>
                            <Menu
                                anchorEl={avatarElement}
                                open={isMenuOpen}
                                onClose={() => setIsMenuOpen(false)}
                                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                transformOrigin={{ vertical: "top", horizontal: "center" }}>
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 1 }}>
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        {user?.username}
                                    </Typography>
                                    <Button component={Link} to={`/reviews/${user.id}`} variant="text" sx={{ mb: 1 }}>
                                        View your reviews
                                    </Button>
                                    <Button onClick={handleLogout} variant="contained" color="error" sx={{ mb: 1 }}>
                                        Logout
                                    </Button>
                                    <Button onClick={handleLogoutAll} variant="contained" color="error" sx={{ mb: 1 }}>
                                        Logout All Devices
                                    </Button>
                                </Box>
                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
