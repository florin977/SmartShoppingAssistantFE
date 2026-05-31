import { useState } from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack,
    Alert,
    TextField,
    Button,
    FormControlLabel,
    Switch,
} from "@mui/material"
import { PromotionsApi } from "../../../api/clients/PromotionApiClient"
import type { Promotion } from "../../shared/types/Promotion"
import { type PromotionType, type RewardType } from "../../shared/types/PromotionTypes"

interface PromotionFormDialogProps {
    promotion: Promotion | null
    onClose: () => void
    onSaved: () => void
}

function PromotionFormDialog({ promotion, onClose, onSaved }: PromotionFormDialogProps) {
    const isEditing = promotion !== null

    const [name, setName] = useState(promotion?.name ?? "")
    const [promotionType, setPromotionType] = useState<PromotionType>(promotion?.type ?? "Quantity")
    const [threshold, setThreshold] = useState(promotion?.threshold ?? 0)
    const [reward, setReward] = useState<RewardType>(promotion?.reward ?? "PercentDiscount")
    const [rewardValue, setRewardValue] = useState(promotion?.rewardValue ?? 0)
    const [productId, setProductId] = useState<number | null>(promotion?.productId ?? null)
    const [categoryId, setCategoryId] = useState<number | null>(promotion?.categoryId ?? null)
    const [isActive, setIsActive] = useState(promotion?.isActive ?? true)
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
            const data = { name, type: promotionType, threshold, reward, rewardValue, productId, categoryId, isActive }
            if (isEditing) {
                await PromotionsApi.update(promotion.id, data)
            } else {
                await PromotionsApi.create(data)
            }
            onSaved()
        } catch (err) {
            setError((err as Error).message)
            setSaving(false)
        }
    }

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEditing ? "Edit promotion" : "Add promotion"}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    {error !== "" && <Alert severity="error">{error}</Alert>}
                    <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                    <TextField
                        label="Promotion Type"
                        value={promotionType}
                        onChange={(e) => setPromotionType(e.target.value as PromotionType)}
                        fullWidth
                    />
                    <TextField
                        label="Threshold"
                        value={threshold}
                        onChange={(e) => setThreshold(Number(e.target.value))}
                        fullWidth
                    />
                    <TextField
                        label="Reward"
                        value={reward}
                        onChange={(e) => setReward(e.target.value as RewardType)}
                        fullWidth
                    />
                    <TextField
                        label="Reward Value"
                        value={rewardValue}
                        onChange={(e) => setRewardValue(Number(e.target.value))}
                        fullWidth
                    />
                    <TextField
                        label="Product ID"
                        value={productId}
                        onChange={(e) => setProductId(Number(e.target.value))}
                        fullWidth
                    />
                    <TextField
                        label="Category ID"
                        value={categoryId}
                        onChange={(e) => setCategoryId(Number(e.target.value))}
                        fullWidth
                    />
                    <FormControlLabel
                        label="Is Active"
                        control={<Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />}
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

export default PromotionFormDialog
