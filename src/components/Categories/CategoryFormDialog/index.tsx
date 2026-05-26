import { useState } from "react"
import type { Category } from "../../shared/types/Category"
import { CategoriesApi } from "../../../api/clients/CategoryApiClient"
import { Dialog } from "@mui/material"
import * as material from "@mui/material"

interface CategoryFormDialogProps {
    category: Category | null
    onClose: () => void
    onSaved: () => void
}

function CategoryFormDialog({ category, onClose, onSaved }: CategoryFormDialogProps) {
    const isEditing = category !== null

    const [name, setName] = useState(category?.name ?? "")
    const [description, setDescription] = useState(category?.description ?? "")
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
            const data = { name, description }
            if (isEditing) {
                await CategoriesApi.update(category.id, data)
            } else {
                await CategoriesApi.create(data)
            }
            onSaved()
        } catch (err) {
            setError((err as Error).message)
            setSaving(false)
        }
    }

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="sm">
            <material.DialogTitle>{isEditing ? "Edit Category" : "Add Category"}</material.DialogTitle>
            <material.DialogContent>
                <material.Stack spacing={2} sx={{ mt: 1 }}>
                    {error !== "" && <material.Alert severity="error">{error}</material.Alert>}
                    <material.TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                    <material.TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={3}
                    />
                </material.Stack>
            </material.DialogContent>
            <material.DialogActions>
                <material.Button onClick={onClose}>Cancel</material.Button>
                <material.Button variant="contained" onClick={handleSave} disabled={saving}>
                    Save
                </material.Button>
            </material.DialogActions>
        </Dialog>
    )
}

export default CategoryFormDialog
