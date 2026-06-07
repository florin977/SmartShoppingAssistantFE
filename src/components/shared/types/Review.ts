import type { ProductReviewModel, UserReviewModel } from "../../../api/models/ReviewModel"
import type { ProductSummary } from "./Product"
import type { UserSummary } from "./User"

export interface ProductReview {
    id: number
    rating: number
    text: string
    postedAt: string
    likes: number
    user: UserSummary
}

export interface UserReview {
    id: number
    rating: number
    text: string
    postedAt: string
    likes: number
    product: ProductSummary
}

export function toProductReview(dto: ProductReviewModel): ProductReview {
    return {
        id: dto.id,
        rating: dto.rating,
        text: dto.text,
        postedAt: dto.postedAt,
        likes: dto.likes,
        user: dto.user,
    }
}

export function toUserReview(dto: UserReviewModel): UserReview {
    return {
        id: dto.id,
        rating: dto.rating,
        text: dto.text,
        postedAt: dto.postedAt,
        likes: dto.likes,
        product: dto.product,
    }
}
