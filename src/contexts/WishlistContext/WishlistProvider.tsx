import { useEffect, useState, type ReactNode } from "react";
import type { Wishlist, WishlistInput } from "../../components/shared/types/Wishlist";
import { WishlistApiClient } from "../../api/clients/WishlistApiClient";
import { WishlistContext } from "./wishlist-context";

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Wishlist[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 5;

    const fetchWishlist = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await WishlistApiClient.getMine({ page, pageSize });
            if (response.items.length === 0 && response.totalCount > 0 && page > 1) {
                setPage(response.totalPages);
                return;
            }

            setItems(response.items);
            setTotalPages(response.totalPages);
            setTotalCount(response.totalCount);
        } catch (err) {
            setError("Failed to load your wishlist.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, [page]);

    useEffect(() => {
        fetchWishlist();
    }, [page]);

    const addToWishlist = async (input: WishlistInput) => {
        setIsLoading(true);
        setError(null);
        try {
            await WishlistApiClient.addToWishlist(input);
            
            if (page === 1) {
                await fetchWishlist();
            } else {
                setPage(1); 
            }
        } catch (err) {
            setError("Failed to add to wishlist");
        } finally {
            setIsLoading(false);
        }
    };

    const removeFromWishlist = async (id: number) => {
        setItems(prev => prev.filter(item => item.id !== id));
        setTotalCount(prev => Math.max(0, prev - 1));
        
        try {
            await WishlistApiClient.removeFromWishlist(id);
            fetchWishlist(); 
        } catch (err) {
            setError("Failed to remove item");
        }
    };

    const getWishlistItem = (productId: number) => {
        return items.find(item => item.productId === productId);
    };

    return (
        <WishlistContext.Provider value={{
            items, isLoading, error, page, totalPages, totalCount, 
            setPage, addToWishlist, removeFromWishlist, 
            getWishlistItem
        }}>
            {children}
        </WishlistContext.Provider>
    );
}