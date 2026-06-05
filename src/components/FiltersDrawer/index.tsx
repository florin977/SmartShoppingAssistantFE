import { Drawer } from "@mui/material"

export interface FiltersDrawerProps {
    open: boolean
    onClose: () => void
}

function FiltersDrawer({ open, onClose }: FiltersDrawerProps) {
    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            Filters Drawer
        </Drawer>
    )
}

export default FiltersDrawer
