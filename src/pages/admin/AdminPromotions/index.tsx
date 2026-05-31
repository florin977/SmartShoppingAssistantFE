import {
    Alert,
    Box,
    CircularProgress,
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import PromotionFormDialog from "../../../components/admin/PromotionFormDialog"
import { PromotionsApi } from "../../../api/clients/PromotionApiClient"
import type { Promotion } from "../../../components/shared/types/Promotion"
import { useEffect, useState } from "react"
import PageHeader from "../../../components/common/PageHeader"
import type { PromotionModel } from "../../../api/models/PromotionModel"
import ConfirmDialog from "../../../components/common/ConfirmDialog"

function AdminPromotions() {
    const [Promotions, setPromotions] = useState<Promotion[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [formOpen, setFormOpen] = useState(false)
    const [editing, setEditing] = useState<Promotion | null>(null)
    const [deleting, setDeleting] = useState<PromotionModel | null>(null)
    const [confirmOpen, setConfirmOpen] = useState(false)

    function loadPromotions() {
        PromotionsApi.getAll()
            .then((data) => {
                setPromotions(data)
                setLoading(false)
                setError("")
            })
            .catch((err) => setError((err as Error).message))
            .finally(() => setLoading(false))
    }

    function handleAdd() {
        setEditing(null)
        setFormOpen(true)
    }
    function handleEdit(promotion: Promotion) {
        setEditing(promotion)
        setFormOpen(true)
    }

    function handleDeleteClick(promotion: Promotion) {
        setDeleting(promotion)
        setConfirmOpen(true)
    }

    async function handleDelete() {
        if (deleting === null) return
        setConfirmOpen(false)
        try {
            await PromotionsApi.remove(deleting.id)
            loadPromotions()
        } catch (err) {
            setError((err as Error).message)
        }
    }

    useEffect(() => {
        loadPromotions()
    }, [])

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <PageHeader title="Promotions" actionLabel={"Add promotion"} onAction={handleAdd} />
            {error !== "" && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Threshold</TableCell>
                                <TableCell>Reward</TableCell>
                                <TableCell>Reward Value</TableCell>
                                <TableCell>Product Id</TableCell>
                                <TableCell>Category Id</TableCell>
                                <TableCell>Is Active</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Promotions.map((promotion) => (
                                <TableRow key={promotion.id} hover>
                                    <TableCell>{promotion.name}</TableCell>
                                    <TableCell>{promotion.type}</TableCell>
                                    <TableCell>{promotion.threshold}</TableCell>
                                    <TableCell>{promotion.reward}</TableCell>
                                    <TableCell>{promotion.rewardValue}</TableCell>
                                    <TableCell>{promotion.productId == null ? "N/A" : promotion.productId}</TableCell>
                                    <TableCell>{promotion.categoryId == null ? "N/A" : promotion.categoryId}</TableCell>
                                    <TableCell>{promotion.isActive == true ? "Yes" : "No"}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton color="primary" onClick={() => handleEdit(promotion)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton color="error" onClick={() => handleDeleteClick(promotion)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {Promotions.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        No Promotions yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {formOpen && (
                <PromotionFormDialog
                    promotion={editing}
                    onClose={() => setFormOpen(false)}
                    onSaved={() => {
                        setFormOpen(false)
                        loadPromotions()
                    }}
                />
            )}
            <ConfirmDialog
                open={confirmOpen}
                title="Delete promotion"
                description={`Are you sure you want to delete "${deleting?.name}"?`}
                confirmLabel="Delete"
                onConfirm={handleDelete}
                onCancel={() => setConfirmOpen(false)}
            />
        </Container>
    )
}

export default AdminPromotions
