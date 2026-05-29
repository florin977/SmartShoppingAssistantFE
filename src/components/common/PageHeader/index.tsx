import { Box, Button, Typography } from "@mui/material"

interface PageHeaderProps {
    title: string
    actionLabel: string
    onAction: () => void
}

function PageHeader({ title, actionLabel, onAction }: PageHeaderProps) {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h4">{title}</Typography>
            <Button variant="contained" onClick={onAction}>
                {actionLabel}
            </Button>
        </Box>
    )
}

export default PageHeader
