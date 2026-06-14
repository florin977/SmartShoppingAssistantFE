import { useState, type ReactNode } from "react";
import type { Wishlist, WishlistInput } from "../../components/shared/types/Wishlist";
import { WishlistApiClient } from "../../api/clients/WishlistApiClient";
import { WishlistContext } from "./wishlist-context";

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Wishlist[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addToWishlist = async (input: WishlistInput) => {
        setIsLoading(true);
        setError(null);
        try {
            const newItem = await WishlistApiClient.addToWishlist(input);
            
            setItems(prev => [...prev, newItem]);
        } catch (err) {
            setError("Failed to add to wishlist");
        } finally {
            setIsLoading(false);
        }
    };

    const removeFromWishlist = async (id: number) => {
        setItems(prev => prev.filter(item => item.id !== id));
        
        try {
            await WishlistApiClient.removeFromWishlist(id);
        } catch (err) {
            setError("Failed to remove item");
        }
    };

    return (
        <WishlistContext.Provider value={{ 
            items, 
            isLoading, 
            error, 
            addToWishlist, 
            removeFromWishlist 
        }}>
            {children}
        </WishlistContext.Provider>
    );
}