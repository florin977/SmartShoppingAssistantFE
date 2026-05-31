import { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, Alert, TextField, Button } from "@mui/material"
import type { Product } from "../../shared/types/Product"
import { ProductsApi } from "../../../api/clients/ProductApiClient"

interface ProductFormDialogProps {
    product: Product | null
    onClose: () => void
    onSaved: () => void
}

function ProductFormDialog({ product, onClose, onSaved }: ProductFormDialogProps) {
    const isEditing = product !== null

    const [name, setName] = useState(product?.name ?? "")
    const [description, setDescription] = useState(product?.description ?? "")
    const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "")
    const [price, setPrice] = useState(product?.price ?? 0)
    const [categoryIds, setCategoryIds] = useState<number[]>(product?.categories?.map((category) => category.id) ?? [])
    const [error, setError] = useState("")
    const [saving, setSaving] = useState(false)

    async function handleSave() {
        if (name.trim() === "") {
            setError("Name is required.")
            return
        }
        setSaving(true)
        setError("")
        try {
            const data = { name, description, imageUrl, price, categoryIds }
            if (isEditing) {
                await ProductsApi.update(product.id, data)
            } else {
                await ProductsApi.create(data)
            }
            onSaved()
        } catch (err) {
            setError((err as Error).message)
            setSaving(false)
        }
    }

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEditing ? "Edit Product" : "Add Product"}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    {error !== "" && <Alert severity="error">{error}</Alert>}

                    <TextField
                        label="ImageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        fullWidth
                    />
                    <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={3}
                    />
                    <TextField
                        label="Category Ids"
                        value={categoryIds.join(",")}
                        onChange={(e) => setCategoryIds(e.target.value.split(",").map(Number))}
                        fullWidth
                    />
                    <TextField
                        type="number"
                        label="Price"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        fullWidth
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

export default ProductFormDialog
