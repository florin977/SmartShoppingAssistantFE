import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css"
import logo from "../../assets/logo.png"

function NavBar() {
    return (
        <AppBar className="main-appbar" position="static" color="default">
            <Toolbar>
                <Link to="/">
                    <Box component="img"
                    src={logo}
                    alt="Smart Shopping Assistant Logo"
                    sx={{height: 56, mr: 2}}
                    />
                </Link>
                <Button className="navbar-btn" component={NavLink} to="/" variant="contained">Home</Button>
                <Button className="navbar-btn" component={NavLink} to="/categories" variant="contained">Categories</Button>
                <Button className="navbar-btn" component={NavLink} to="/products" variant="contained">Products</Button>
                <Button className="navbar-btn" component={NavLink} to="/promotions" variant="contained">Promotions</Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;