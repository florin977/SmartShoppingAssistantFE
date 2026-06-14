//import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./theme.ts"
import { CssBaseline } from "@mui/material"
import { AuthProvider } from "./contexts/AuthContext/AuthProvider.tsx"

createRoot(document.getElementById("root")!).render(
    //<StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
   //</StrictMode>,
)
