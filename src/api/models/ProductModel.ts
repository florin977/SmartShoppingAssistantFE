import type { CategoryModel } from "./CategoryModel"

export interface ProductModel {
    id: number
    name: string
    description: string
    imageUrl: string
    price: number
    categories: CategoryModel[]
}

export interface ProductInput {
    name: string
    description: string
    imageUrl: string
    price: number
    categoryIds: number[]
}
