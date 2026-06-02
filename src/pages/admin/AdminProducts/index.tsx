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
import { useEffect, useState } from "react"
import type { Product } from "../../../components/shared/types/Product"
import type { ProductModel } from "../../../api/models/ProductModel"
import { ProductsApi } from "../../../api/clients/ProductApiClient"
import PageHeader from "../../../components/common/PageHeader"
import ProductFormDialog from "../../../components/admin/ProductFormDialog"
import ConfirmDialog from "../../../components/common/ConfirmDialog"

function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [formOpen, setFormOpen] = useState(false)
    const [editing, setEditing] = useState<Product | null>(null)
    const [deleting, setDeleting] = useState<ProductModel | null>(null)
    const [confirmOpen, setConfirmOpen] = useState(false)

    function loadProducts() {
        ProductsApi.getAll()
            .then((data) => {
                setProducts(data)
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

    function handleEdit(product: Product) {
        setEditing(product)
        setFormOpen(true)
    }

    function handleDeleteClick(product: Product) {
        setDeleting(product)
        setConfirmOpen(true)
    }

    async function handleDelete() {
        if (deleting === null) return
        setConfirmOpen(false)
        try {
            await ProductsApi.remove(deleting.id)
            loadProducts()
        } catch (err) {
            setError((err as Error).message)
        }
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <PageHeader title="Products" actionLabel={"Add Product"} onAction={handleAdd} />
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
                                <TableCell>ImageUrl</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id} hover>
                                    <TableCell>
                                        <Box
                                            component="img"
                                            src={product.imageUrl}
                                            alt={product.name}
                                            sx={{ objectFit: "cover", width: 50, height: 50 }}
                                        />
                                    </TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>{product.price} Ron</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton color="primary" onClick={() => handleEdit(product)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton color="error" onClick={() => handleDeleteClick(product)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {products.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        No products yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {formOpen && (
                <ProductFormDialog
                    product={editing}
                    onClose={() => setFormOpen(false)}
                    onSaved={() => {
                        setFormOpen(false)
                        loadProducts()
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

export default AdminProducts
