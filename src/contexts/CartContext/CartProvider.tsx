import { useEffect, useRef, useState, type ReactNode } from "react"
import type { Cart } from "../../components/shared/types/Cart"
import { CartApiClient } from "../../api/clients/CartApiClient"
import { CartContext } from "./cart-context"
import { useAuth } from "../AuthContext/AuthContext"

function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Cart | null>(null)
    const [open, setOpen] = useState(false)

    const { user } = useAuth()
    const prevUserRef = useRef(user)

    const loadCart = () => {
        CartApiClient.get()
            .then(setCart)
            .catch(() => setCart(null))
    }

    async function addItem(productId: number, quantity: number) {
        await CartApiClient.addItem({ productId, quantity })
        loadCart()
    }

    async function updateQuantity(productId: number, quantity: number) {
        await CartApiClient.updateItem(productId, { quantity })
        loadCart()
    }

    async function removeProduct(productId: number) {
        await CartApiClient.removeItem(productId)
        loadCart()
    }

    useEffect(() => {
        if (prevUserRef.current && !user) {
            setCart(null)
        } else if (!prevUserRef.current && user) {
            loadCart()
        }
    }, [user])

    return (
        <CartContext.Provider
            value={{
                cart: cart,
                open: open,
                openCart: () => setOpen(true),
                closeCart: () => setOpen(false),
                addItem: addItem,
                updateQuantity: updateQuantity,
                removeProduct: removeProduct,
            }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
