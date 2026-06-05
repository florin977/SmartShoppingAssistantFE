import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    TextField,
    Typography,
    type SelectChangeEvent,
} from "@mui/material"
import { useEffect, useState } from "react"
import type { Product } from "../../components/shared/types/Product"
import { ProductsApi } from "../../api/clients/ProductApiClient"
import { AddShoppingCart } from "@mui/icons-material"
import { useCart } from "../../contexts/CartContext/cart-context"
import type { ProductQuery } from "../../components/shared/types/ProductQuery"
import PageHeader from "../../components/common/PageHeader"
import FiltersDrawer from "../../components/FiltersDrawer"
import type { Category } from "../../components/shared/types/Category"
import { CategoriesApi } from "../../api/clients/CategoryApiClient"

function Shop() {
    const SORT_OPTIONS = [
        { label: "Price: Low to High", sortBy: "price", sortDirection: "asc" },
        { label: "Price: High to Low", sortBy: "price", sortDirection: "desc" },
        { label: "Name: A to Z", sortBy: "name", sortDirection: "asc" },
        { label: "Name: Z to A", sortBy: "name", sortDirection: "desc" },
    ] as const

    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [err, setError] = useState("")

    const [query, setQuery] = useState<ProductQuery>({ Page: 1, PageSize: 10 })

    const [search, setSearch] = useState("")
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

    const [totalCount, setTotalCount] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])
    const [selectedCategories, setSelectedCategories] = useState<number[]>([])
    const [maxPrice, setMaxPrice] = useState(2000)
    const [minPrice, setMinPrice] = useState(0)

    const { addItem } = useCart()

    const handleAddToCart = async (product: Product) => {
        await addItem(product.id, 1)
    }

    function loadProducts(query: ProductQuery = {}) {
        ProductsApi.getFiltered(query)
            .then((data) => {
                setProducts(data.items)
                setTotalCount(data.totalCount)
                setTotalPages(data.totalPages)
                setLoading(false)
                setError("")
            })
            .catch((err) => setError((err as Error).message))
            .finally(() => setLoading(false))
    }

    function handleSearch(searchTerm: string) {
        setSearch(searchTerm)
        if (timer) {
            clearTimeout(timer)
        }

        const newTimer = setTimeout(() => {
            setQuery((prev) => ({
                ...prev,
                Page: 1,
                Search: searchTerm,
            }))
        }, 700)

        setTimer(newTimer)
    }

    function handlePagination(event: React.ChangeEvent<unknown>, page: number) {
        window.scrollTo({ top: 0, behavior: "smooth" })
        setQuery((prev) => ({
            ...prev,
            Page: page,
        }))
    }

    function getSortLabel(): string {
        return (
            SORT_OPTIONS.find(
                (option) => option.sortBy === query.SortBy && option.sortDirection === query.SortDirection,
            )?.label ?? ""
        )
    }

    const handleSortChange = (event: SelectChangeEvent) => {
        const option = SORT_OPTIONS.find((o) => o.label === event.target.value)

        setQuery((prev) => ({
            ...prev,
            Page: 1,
            SortBy: option?.sortBy,
            SortDirection: option?.sortDirection,
        }))
    }
    function loadCategories() {
        CategoriesApi.getAll()
            .then((data) => {
                setCategories(data)
            })
            .catch((err) => setError((err as Error).message))
            .finally(() => setLoading(false))
    }

    function handleToggleCategory(categoryId: number) {
        setSelectedCategories((prev) =>
            prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
        )
    }

    function handleApply() {
        setQuery((prev) => ({
            ...prev,
            Page: 1,
            CategoryIds: selectedCategories,
            MinPrice: minPrice,
            MaxPrice: maxPrice,
        }))
        setIsFiltersDrawerOpen(false)
    }

    useEffect(() => {
        loadProducts(query)
    }, [query])

    useEffect(() => {
        loadCategories()
    }, [])

    const sortLabel = getSortLabel()

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {err !== "" && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {err}
                </Alert>
            )}
            <PageHeader
                title="Shop"
                action={
                    <FormControl size="small" sx={{ minWidth: 200 }}>
                        <InputLabel id="sort-label">Sort By</InputLabel>
                        <Select labelId="sort-label" value={sortLabel} label="Sort By" onChange={handleSortChange}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {SORT_OPTIONS.map((option) => (
                                <MenuItem key={option.label} value={option.label}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                }
            />
            <TextField
                label="Search products"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Box sx={{ display: "flex", justifyContent: "space-between", pb: 1 }}>
                        <Button variant="outlined" onClick={() => setIsFiltersDrawerOpen(true)}>
                            Filters
                        </Button>
                        <Typography variant="h6">Total products found: {totalCount}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "grid",
                            gap: 2,
                            flexGrow: 1,
                            alignContent: "start",
                            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                        }}>
                        {products.map((product) => (
                            <Card key={product.id} sx={{ display: "flex", flexDirection: "column" }}>
                                <CardMedia
                                    component="img"
                                    height="160"
                                    image={product.imageUrl}
                                    alt={product.name}
                                    sx={{ objectFit: "cover" }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6">{product.name}</Typography>
                                    <Typography variant="body2" color="textDisabled">
                                        {product.description}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ pt: 1 }}>
                                        {product.price} Ron
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        startIcon={<AddShoppingCart />}
                                        onClick={() => handleAddToCart(product)}>
                                        Add to Cart
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                    <Box>
                        <Pagination
                            count={totalPages}
                            page={query.Page ?? 1}
                            onChange={handlePagination}
                            sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                        />
                    </Box>
                    <FiltersDrawer
                        open={isFiltersDrawerOpen}
                        onClose={() => setIsFiltersDrawerOpen(false)}
                        categories={categories}
                        selectedCategories={selectedCategories}
                        handleToggleCategory={handleToggleCategory}
                        maxPrice={maxPrice}
                        minPrice={minPrice}
                        handleApply={handleApply}
                        loading={loading}
                        err={err}></FiltersDrawer>
                </>
            )}
            {products.length === 0 && (
                <Typography variant="h6" color="textDisabled">
                    No products found
                </Typography>
            )}
        </Container>
    )
}

export default Shop
