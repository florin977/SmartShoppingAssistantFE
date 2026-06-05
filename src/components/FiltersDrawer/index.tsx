import {
    Box,
    Drawer,
    IconButton,
    ListItem,
    Typography,
    Checkbox,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Alert,
    Slider,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import type { Category } from "../shared/types/Category"
import { useEffect, useState } from "react"
import { CategoriesApi } from "../../api/clients/CategoryApiClient"

export interface FiltersDrawerProps {
    open: boolean
    onClose: () => void
}

function FiltersDrawer({ open, onClose }: FiltersDrawerProps) {
    const [categories, setCategories] = useState<Category[] | null>([])
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState("")

    function getCategories() {
        CategoriesApi.getAll()
            .then((data) => {
                setCategories(data)
            })
            .catch((err) => setErr((err as Error).message))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 400,
                    p: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}>
                {err && <Alert severity="error">{err}</Alert>}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                    }}>
                    <Typography variant="h6">Filters</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box>
                    <Typography variant="body2">Categories</Typography>
                    <List disablePadding>
                        {categories?.map((category) => (
                            <ListItem disablePadding key={category.id}>
                                <ListItemButton dense>
                                    <ListItemIcon>
                                        <Checkbox edge="start" disableRipple />
                                    </ListItemIcon>
                                    <ListItemText primary={category.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Box>
                        <Typography variant="body2">Price Range</Typography>
                        <Slider min={0} max={2000} defaultValue={100} />
                    </Box>
                </Box>
            </Box>
        </Drawer>
    )
}

export default FiltersDrawer
