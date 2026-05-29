import { AppBar, Box, Button, Toolbar } from "@mui/material"
import { Link, NavLink } from "react-router-dom"
import "./NavBar.css"
import logo from "../../assets/logo.png"

function NavBar() {
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
                    <Button className="navbar-btn" component={NavLink} to="/categories" variant="text">
                        Categories
                    </Button>
                    <Button className="navbar-btn" component={NavLink} to="/products" variant="text">
                        Products
                    </Button>
                    <Button className="navbar-btn" component={NavLink} to="/promotions" variant="text">
                        Promotions
                    </Button>
                </Box>

                <Box className="nav-island">
                    <Button className="navbar-btn-login" component={NavLink} to="/auth/login" variant="text">
                        Login
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
