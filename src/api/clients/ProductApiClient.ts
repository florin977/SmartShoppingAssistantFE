import type { PagedResult } from "../../components/shared/types/PagedResult"
import { toProduct, type Product } from "../../components/shared/types/Product"
import type { ProductQuery } from "../../components/shared/types/ProductQuery"
import { http } from "../base/http"
import type { ProductInput, ProductModel } from "../models/ProductModel"
import qs from "qs"

export const ProductsApi = {
    getAll: async (): Promise<Product[]> => {
        const data = await http.get<ProductModel[]>("/Products/all")
        return data.map(toProduct)
    },
    getFiltered: async (query: ProductQuery): Promise<PagedResult<Product>> => {
        const data = await http.get<PagedResult<ProductModel>>("/Products", {
            params: query,
            paramsSerializer: (params) => qs.stringify(params),
        })
        return {
            items: data.items.map(toProduct),
            totalCount: data.totalCount,
            totalPages: data.totalPages,
        }
    },
    getById: async (id: number): Promise<Product> => {
        return toProduct(await http.get<ProductModel>(`/Products/${id}`))
    },
    create: async (data: ProductInput): Promise<Product> => {
        return toProduct(await http.post<ProductModel>("/Products", data))
    },
    update: async (id: number, data: ProductInput): Promise<Product> => {
        return toProduct(await http.put<ProductModel>(`/Products/${id}`, data))
    },
    remove: async (id: number) => http.remove<void>(`/Products/${id}`),
}
