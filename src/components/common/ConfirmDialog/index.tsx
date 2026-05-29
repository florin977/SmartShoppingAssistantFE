import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

interface ConfirmDialogProps {
    open: boolean
    title: string
    description: string
    confirmLabel: string
    onConfirm: () => void
    onCancel: () => void
    confirmColor?: "error" | "primary" | "secondary" | "info" | "success" | "warning"
}

function ConfirmDialog({
    open,
    title,
    description,
    confirmLabel,
    onConfirm,
    onCancel,
    confirmColor = "error",
}: ConfirmDialogProps) {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button color={confirmColor} variant="contained" onClick={onConfirm}>
                    {confirmLabel}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
