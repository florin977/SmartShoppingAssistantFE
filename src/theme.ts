import { responsiveFontSizes, createTheme } from "@mui/material/styles"

const theme = createTheme({
    cssVariables: true,
    palette: {
        mode: "dark",
        primary: {
            main: "#4ECCA3",
            light: "#7CDBBC",
            dark: "#36A684",
            contrastText: "#0F1B16",
        },
        secondary: {
            main: "#F2B134", // warm accent for deals, "AI pick" highlights, and ratings
            light: "#F6C868",
            dark: "#CC9020",
            contrastText: "#231B0A",
        },
        background: {
            default: "#1B2128", // page background — slightly deeper than before
            paper: "#262D35", // cards, dialogs, surfaces
        },
        text: {
            primary: "#EAEFEF",
            secondary: "#9FB4B8", // muted teal-gray, no longer a 1:1 copy of primary
        },
        divider: "rgba(255, 255, 255, 0.08)",
        success: {
            main: "#6FCF97", // in stock / price drop
            contrastText: "#0E2818",
        },
        warning: {
            main: "#F2B134", // low stock / limited-time deal
            contrastText: "#231B0A",
        },
        error: {
            main: "#F2645C", // sold out / errors
            contrastText: "#2A0E0C",
        },
        info: {
            main: "#5BB8D4", // AI insight / recommendation banners
            contrastText: "#0B252C",
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
                contained: {
                    "&:hover": {
                        // Subtle teal glow on primary actions — the one "smart" signature touch
                        boxShadow: "0 0 16px rgba(78, 204, 163, 0.35)",
                    },
                },
            },
        },
        // 2. Paper Overrides (Affects Cards, Dialogs, and your Login/Register boxes)
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none", // MUI adds a white overlay to Paper in dark mode; this removes it for pure colors
                    boxShadow: "none", // Flat design, no global shadows
                    borderRadius: 16, // Your standard --radius-lg
                },
            },
        },
        // 3. Card Overrides (a hairline border gives definition now that shadows are off)
        MuiCard: {
            styleOverrides: {
                root: {
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                },
            },
        },
        // 4. AppBar Overrides (Cleans up your NavBar)
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: "none",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                },
            },
        },
        // 5. Chip Overrides (filter tags, "sale" / "AI pick" badges)
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: "100rem",
                    fontWeight: 600,
                },
            },
        },
        // 6. Input Overrides (search bars, forms — rounded with a teal focus ring)
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    "&.Mui-focused": {
                        boxShadow: "0 0 0 3px rgba(78, 204, 163, 0.2)",
                    },
                },
            },
        },
        // 7. Rating Overrides (gold stars for reviews)
        MuiRating: {
            styleOverrides: {
                iconFilled: {
                    color: "#F2B134",
                },
                iconEmpty: {
                    color: "rgba(255, 255, 255, 0.2)",
                },
            },
        },
        // 8. Tooltip Overrides (uses the elevated surface tone)
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: "#313944",
                    color: "#EAEFEF",
                    fontWeight: 500,
                },
            },
        },
    },
})
export default responsiveFontSizes(theme)