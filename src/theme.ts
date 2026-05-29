import { responsiveFontSizes, createTheme } from "@mui/material/styles"

const theme = createTheme({
    cssVariables: true,
    palette: {
        mode: "dark",

        primary: {
            main: "#4ECCA3",
            contrastText: "#232931",
        },

        secondary: {
            main: "#393E46",
            contrastText: "#EEEEEE",
        },

        background: {
            default: "#232931",
            paper: "#393E46",
        },

        text: {
            primary: "#EEEEEE",
            secondary: "#4ECCA3",
        },
    },

    components: {
        // 1. Button Overrides
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "100rem", // Pill shape
                    textTransform: "none", // Stops MUI from making buttons ALL CAPS
                    fontWeight: 600, // Makes button text punchier
                    boxShadow: "none", // Flat design (removes default drop shadow)
                },
            },
        },

        // 2. Paper Overrides (Affects Cards, Dialogs, and your Login/Register boxes)
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none", // MUI adds a white overlay to Paper in dark mode; this removes it for pure colors
                    boxShadow: "none", // You explicitly removed shadows in your CSS, this does it globally
                    borderRadius: 16, // Your standard --radius-lg
                },
            },
        },

        // 3. AppBar Overrides (Cleans up your NavBar)
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: "none",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                },
            },
        },
    },
})

export default responsiveFontSizes(theme)
