import type { PromotionModel, Promotiontype, RewardType } from "../../../api/models/PromotionModel"

export interface Promotion {
    id: number
    name: string
    type: Promotiontype
    threshold: number
    reward: RewardType
    rewardValue: number
    productId?: number
    categoryId?: number
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
        productId: dto.productId,
        categoryId: dto.categoryId,
        isActive: dto.isActive,
    }
}
