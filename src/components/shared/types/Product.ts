import type { ProductModel } from "../../../api/models/ProductModel"
import { toCategory, type Category } from "./Category"

export interface Product {
    id: number
    name: string
    description: string
    imageUrl: string
    price: number
    categories: Category[]
}

export interface ProductSummary {
    id: number
    name: string
    imageUrl: string
}

export function toProduct(dto: ProductModel): Product {
    return {
        id: dto.id,
        name: dto.name,
        description: dto.description,
        imageUrl: dto.imageUrl,
        price: dto.price,
        categories: dto.categories.map(toCategory) ?? [],
    }
}
