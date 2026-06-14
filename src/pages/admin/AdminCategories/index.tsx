import {
    Alert,
    Box,
    Button,
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
import { useEffect, useState } from "react"
import { useAuth } from "../../../contexts/AuthContext/auth-context"
import type { Category } from "../../../components/shared/types/Category"
import { CategoriesApi } from "../../../api/clients/CategoryApiClient"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import PageHeader from "../../../components/common/PageHeader"
import CategoryFormDialog from "../../../components/admin/CategoryFormDialog"
import type { CategoryModel } from "../../../api/models/CategoryModel"
import ConfirmDialog from "../../../components/common/ConfirmDialog"

function AdminCategories() {
    const { user } = useAuth()
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [formOpen, setFormOpen] = useState(false)
    const [editing, setEditing] = useState<Category | null>(null)
    const [deleting, setDeleting] = useState<CategoryModel | null>(null)
    const [confirmOpen, setConfirmOpen] = useState(false)

    if (user?.role !== "Admin") {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Alert severity="error">Access Denied: Admin privileges required.</Alert>
            </Container>
        )
    }

    function loadCategories() {
        CategoriesApi.getAll()
            .then((data) => {
                setCategories(data)
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
    function handleEdit(category: Category) {
        setEditing(category)
        setFormOpen(true)
    }

    function handleDeleteClick(category: Category) {
        setDeleting(category)
        setConfirmOpen(true)
    }

    async function handleDelete() {
        if (deleting === null) return
        setConfirmOpen(false)
        try {
            await CategoriesApi.remove(deleting.id)
            loadCategories()
        } catch (err) {
            setError((err as Error).message)
        }
    }

    useEffect(() => {
        loadCategories()
    }, [])

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <PageHeader
                title="Categories"
                action={
                    <Button variant="contained" onClick={handleAdd}>
                        Add Category
                    </Button>
                }
            />
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
                                <TableCell>Description</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id} hover>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.description}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton color="primary" onClick={() => handleEdit(category)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton color="error" onClick={() => handleDeleteClick(category)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {categories.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        No categories yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {formOpen && (
                <CategoryFormDialog
                    category={editing}
                    onClose={() => setFormOpen(false)}
                    onSaved={() => {
                        setFormOpen(false)
                        loadCategories()
                    }}
                />
            )}
            <ConfirmDialog
                open={confirmOpen}
                title="Delete category"
                description={`Are you sure you want to delete "${deleting?.name}"?`}
                confirmLabel="Delete"
                onConfirm={handleDelete}
                onCancel={() => setConfirmOpen(false)}
            />
        </Container>
    )
}

export default AdminCategories
