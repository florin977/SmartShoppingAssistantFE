import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    cssVariables: true,
    palette: {
        mode: "dark",
        primary: {
            main: "#f5f5f5", // --accent-primary
            contrastText: "#0d0d0d", // --accent-text
        },
        background: {
            default: "#0d0d0d", // --bg-color
            paper: "#2a2a2a", // --surface-color
        },
        text: {
            primary: "#f5f5f5",
            secondary: "#999999",
        },
        divider: "rgba(255, 255, 255, 0.08)", // --border-color
    },
    shape: {
        borderRadius: 12, // --radius-md
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: "100%",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    border: "none",
                },
            },
        },
    },
})

export default theme
