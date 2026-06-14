import type { WishlistModel } from "../../../api/models/WishlistModel";
import type { ProductSummary } from "./Product";

export interface Wishlist {
    id: number,
    productId: number,
    userId: number,
    addedAt: string,
    product: ProductSummary
}

export interface WishlistInput {
    productID: number
}

export function toWishlist(dto: WishlistModel): Wishlist {
    return {
        id: dto.id,
        productId: dto.productId,
        userId: dto.userId,
        addedAt: dto.addedAt,
        product: dto.product
    }
}