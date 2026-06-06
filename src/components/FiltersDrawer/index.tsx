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
    Button,
    CircularProgress,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import type { Category } from "../shared/types/Category"

export interface FiltersDrawerProps {
    open: boolean
    onClose: () => void
    categories: Category[]
    selectedCategories: number[]
    handleToggleCategory: (categoryId: number) => void
    sliderRange: number[]
    handleSliderChange: (event: Event, range: number[]) => void
    handleApply: () => void
    loading: boolean
    clearFilters: () => void
    err: string
}

function FiltersDrawer({
    open,
    onClose,
    categories,
    selectedCategories,
    handleToggleCategory,
    sliderRange,
    handleSliderChange,
    handleApply,
    loading,
    clearFilters,
    err,
}: FiltersDrawerProps) {
    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <Box sx={{ width: 400, p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
                {err && <Alert severity="error">{err}</Alert>}

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="h6">Filters</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Box>
                            <Typography variant="body2">Categories</Typography>
                            <List disablePadding>
                                {categories.map((category) => (
                                    <ListItem disablePadding key={category.id}>
                                        <ListItemButton dense onClick={() => handleToggleCategory(category.id)}>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    disableRipple
                                                    checked={selectedCategories.includes(category.id)}
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={category.name} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>

                            <Box sx={{ mt: 2 }}>
                                <Slider min={0} max={2000} value={sliderRange} onChange={handleSliderChange} />
                                <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                                    <Typography variant="body2">Min Price: {sliderRange[0]} Ron</Typography>
                                    <Typography variant="body2">Max Price: {sliderRange[1]} Ron</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ mt: "auto", pt: 2 }}>
                                <Button variant="contained" fullWidth onClick={handleApply}>
                                    Apply Filters
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    onClick={clearFilters}
                                    sx={{ mt: 1 }}>
                                    Clear Filters
                                </Button>
                            </Box>
                        </Box>
                    </>
                )}
            </Box>
        </Drawer>
    )
}

export default FiltersDrawer
