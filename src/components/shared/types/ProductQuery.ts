export interface ProductQuery {
    Search?: string
    MinPrice?: number
    MaxPrice?: number
    CategoryId?: number
    SortBy?: string
    SortDirection?: string
    Page?: number
    PageSize?: number
}
