export interface ProductQuery {
    Search?: string
    MinPrice?: number
    MaxPrice?: number
    CategoryIds?: number[]
    SortBy?: string
    SortDirection?: string
    Page?: number
    PageSize?: number
}
