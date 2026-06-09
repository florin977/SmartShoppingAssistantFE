import { toAnalysis, type Analysis } from "../../components/shared/types/Analysis"
import { type Cart, toCartModel } from "../../components/shared/types/Cart"
import { http } from "../base/http"
import type { AnalysisModel } from "../models/AnalysisModel"
import type { AddCartItemInput, CartModel, UpdateCartItemInput } from "../models/CartModel"

export const CartApiClient = {
    get: async (): Promise<Cart> => {
        return toCartModel(await http.get<CartModel>("/cart"))
    },
    addItem: async (data: AddCartItemInput): Promise<void> => {
        await http.post("/cart/items", data)
    },
    updateItem: async (itemId: number, data: UpdateCartItemInput): Promise<void> => {
        await http.put(`/cart/items/${itemId}`, data)
    },
    removeItem: (itemId: number) => http.remove<void>(`/cart/items/${itemId}`),
    removeAllItems: () => http.remove<void>("/cart"),
    analyze: async (): Promise<Analysis> => {
        return toAnalysis(await http.post<AnalysisModel>("/cart/analyze", {}))
    }
}
