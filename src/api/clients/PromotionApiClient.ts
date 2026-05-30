import { toPromotion, type Promotion } from "../../components/shared/types/Promotion"
import { http } from "../base/http"
import type { PromotionInput, PromotionModel } from "../models/PromotionModel"

export const PromotionsApi = {
    getAll: async (): Promise<Promotion[]> => {
        const data = await http.get<PromotionModel[]>("/Promotions")
        return data.map(toPromotion)
    },
    getById: async (id: number): Promise<Promotion> => {
        return toPromotion(await http.get<PromotionModel>(`/Promotions/${id}`))
    },
    create: async (data: PromotionInput): Promise<Promotion> => {
        return toPromotion(await http.post<PromotionModel>("/Promotions", data))
    },
    update: async (id: number, data: PromotionInput): Promise<Promotion> => {
        return toPromotion(await http.put<PromotionModel>(`/Promotions/${id}`, data))
    },
    remove: async (id: number) => http.remove<void>(`/Promotions/${id}`),
}
