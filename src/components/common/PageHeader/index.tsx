import { Box, Typography } from "@mui/material"

interface PageHeaderProps {
    title: string
    action: React.ReactNode
}

function PageHeader({ title, action }: PageHeaderProps) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
            }}>
            <Typography variant="h4">{title}</Typography>

            {action && <Box>{action}</Box>}
        </Box>
    )
}

export default PageHeader
