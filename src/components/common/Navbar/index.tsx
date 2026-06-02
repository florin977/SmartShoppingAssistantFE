import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { Link, NavLink } from "react-router-dom"
import "./NavBar.css"
import logo from "../../../assets/logo.png"
import { useAuth } from "../../../contexts/AuthContext"

function NavBar() {
    const { user, logout } = useAuth()

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
                            <Button className="navbar-btn-login" onClick={logout} variant="text">
                                Logout
                            </Button>
                            <Typography variant="body2" className="">
                                {user?.username}
                            </Typography>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
