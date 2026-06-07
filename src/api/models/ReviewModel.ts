import type { ProductSummary } from "../../components/shared/types/Product"
import type { UserSummary } from "../../components/shared/types/User"

export interface ProductReviewModel {
    id: number
    rating: number
    text: string
    postedAt: string
    likes: number
    user: UserSummary
}

export interface UserReviewModel {
    id: number
    rating: number
    text: string
    postedAt: string
    likes: number
    product: ProductSummary
}
