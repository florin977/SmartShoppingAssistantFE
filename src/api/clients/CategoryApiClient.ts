import { toCategory, type Category } from "../../components/shared/types/Category"
import { http } from "../base/http"
import type { CategoryInput, CategoryModel } from "../models/CategoryModel"

export const CategoriesApi = {
    getAll: async (): Promise<Category[]> => {
        const data = await http.get<CategoryModel[]>("/Categories")
        return data.map(toCategory)
    },
    getById: async (id: number): Promise<Category> => {
        const data = await http.get<Category>(`/Categories/${id}`)
        return toCategory(data)
    },
    create: async (data: CategoryInput): Promise<Category> => {
        return toCategory(await http.post<CategoryModel>("/Categories", data))
    },
    update: async (id: number, data: CategoryInput): Promise<Category> => {
        return toCategory(await http.put<CategoryModel>(`/Categories/${id}`, data))
    },
    remove: (id: number) => http.remove<void>(`/Categories/${id}`),
}
