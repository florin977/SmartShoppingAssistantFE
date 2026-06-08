import type { ProductSummary } from "../../components/shared/types/Product"
import type { UserSummary } from "../../components/shared/types/User"

export interface ProductReviewModel {
    id: number
    rating: number
    text: string
    postedAt: string
    updatedAt: string | null
    likes: number
    user: UserSummary
}

export interface UserReviewModel {
    id: number
    rating: number
    text: string
    postedAt: string
    updatedAt: string | null
    likes: number
    product: ProductSummary
}

export interface ReviewInput {
    productId: number
    rating: number
    text?: string
}