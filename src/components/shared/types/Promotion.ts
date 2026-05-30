import type { PromotionModel } from "../../../api/models/PromotionModel"
import type { PromotionType, RewardType } from "./PromotionTypes"

export interface Promotion {
    id: number
    name: string
    type: PromotionType
    threshold: number
    reward: RewardType
    rewardValue: number
    productId: number | null
    categoryId: number | null
    isActive: boolean
}

export function toPromotion(dto: PromotionModel): Promotion {
    return {
        id: dto.id,
        name: dto.name,
        type: dto.type,
        threshold: dto.threshold,
        reward: dto.reward,
        rewardValue: dto.rewardValue,
        productId: dto.productId ?? null,
        categoryId: dto.categoryId ?? null,
        isActive: dto.isActive,
    }
}
