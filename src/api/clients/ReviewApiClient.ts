import type { PagedResult } from "../../components/shared/types/PagedResult"
import {
    toProductReview,
    toUserReview,
    type ProductReview,
    type UserReview,
} from "../../components/shared/types/Review"
import { http } from "../base/http"
import type { ProductReviewModel, UserReviewModel } from "../models/ReviewModel"
import type { PaginationQuery } from "../../components/shared/types/PaginationQuery"

export const ReviewsApi = {
    getByProductId: async (productId: number, query: PaginationQuery): Promise<PagedResult<ProductReview>> => {
        const data = await http.get<PagedResult<ProductReviewModel>>(`/Reviews/product/${productId}`, { params: query })
        return {
            items: data.items.map(toProductReview),
            totalCount: data.totalCount,
            totalPages: data.totalPages,
        }
    },
    getByUserId: async (userId: number, query: PaginationQuery): Promise<PagedResult<UserReview>> => {
        const data = await http.get<PagedResult<UserReviewModel>>(`/Reviews/user/${userId}`, { params: query })
        return {
            items: data.items.map(toUserReview),
            totalCount: data.totalCount,
            totalPages: data.totalPages,
        }
    },
    // TODO: update, delete, create
}
