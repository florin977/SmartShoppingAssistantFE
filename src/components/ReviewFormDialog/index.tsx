import { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, Alert, TextField, Button, Rating } from "@mui/material"
import type { ProductReview, UserReview } from "../shared/types/Review"
import { ReviewsApi } from "../../api/clients/ReviewApiClient"

interface ReviewFormDialogProps {
    review: ProductReview | UserReview | null
    productId: number
    onClose: () => void
    onSaved: () => void
}

function ReviewFormDialog({ review, productId, onClose, onSaved }: ReviewFormDialogProps) {
    const isEditing = review !== null

    const [rating, setRating] = useState(review?.rating ?? 5)
    const [text, setText] = useState(review?.text ?? "")
    const [error, setError] = useState("")
    const [saving, setSaving] = useState(false)

    async function handleSave() {
        if (!(0 < rating && rating <= 5)) {
            setError("Rating is required. Must be between 1 and 5.")
            return
        }
        setSaving(true)
        setError("")
        try {
            const data = { productId, rating, text }
            if (isEditing) {
                await ReviewsApi.updateReview(review.id, data)
            } else {
                await ReviewsApi.postReview(data)
            }
            onSaved()
        } catch (err) {
            setError((err as Error).message)
            setSaving(false)
        }
    }

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEditing ? "Edit Review" : "Add Review"}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    {error !== "" && <Alert severity="error">{error}</Alert>}
                    <Rating value={rating} onChange={(e, newRating) => setRating(newRating?? 0)} />
                    <TextField
                        label="Your review"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        fullWidth
                        multiline
                        rows={3}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSave} disabled={saving}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ReviewFormDialog
