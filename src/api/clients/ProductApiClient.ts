import { toProduct, type Product } from "../../components/shared/types/Product"
import { http } from "../base/http"
import type { ProductInput, ProductModel } from "../models/ProductModel"

export const ProductsApi = {
    getAll: async (): Promise<Product[]> => {
        const data = await http.get<ProductModel[]>("/Products")
        return data.map(toProduct)
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
