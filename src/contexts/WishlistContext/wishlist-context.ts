import { createContext, useContext } from 'react';
import type { Wishlist, WishlistInput } from '../../components/shared/types/Wishlist';

export interface WishlistContextType {
    items: Wishlist[];
    isLoading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
    totalCount: number;
    setPage: (page: number) => void;
    addToWishlist: (input: WishlistInput) => Promise<void>;
    removeFromWishlist: (id: number) => Promise<void>;
    getWishlistItem: (productId: number) => Wishlist | undefined;
}

export const WishlistContext = createContext<WishlistContextType | null>(null);

export function useWishlist() {
    const context = useContext(WishlistContext)
    if (context === null) {
        throw new Error("useWishlist must be used within a WishlistProvider")
    }
    return context
}
