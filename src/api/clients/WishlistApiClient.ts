import type { PagedResult } from "../../components/shared/types/PagedResult"
import type { PaginationQuery } from "../../components/shared/types/PaginationQuery"
import { toWishlist, type Wishlist, type WishlistInput } from "../../components/shared/types/Wishlist"
import { http } from "../base/http"
import type { WishlistModel } from "../models/WishlistModel"

export const WishlistApiClient = {
    getMine: async(query?: PaginationQuery): Promise<PagedResult<Wishlist>> => {
        const data = await http.get<PagedResult<WishlistModel>>("/Wishlist", { params: query })
        return {
            items: data.items.map(toWishlist),
            totalCount: data.totalCount,
            totalPages: data.totalPages
        }
    },
    addToWishlist: async(data: WishlistInput): Promise<Wishlist> => {
        const result = await http.post<WishlistModel>("/Wishlist", data)
        return toWishlist(result);
    },
    removeFromWishlist: async(productId: number): Promise<void> => {
        return await http.remove<void>(`/Wishlist/${productId}`)
    }
}