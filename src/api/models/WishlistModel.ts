import type { ProductSummary } from "../../components/shared/types/Product";

export interface WishlistModel {
    id: number,
    productId: number,
    userId: number,
    addedAt: string,
    product: ProductSummary
}