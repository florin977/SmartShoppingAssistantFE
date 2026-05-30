import type { PromotionType, RewardType } from "../../components/shared/types/PromotionTypes"

export interface PromotionModel {
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

export interface PromotionInput {
    name: string
    type: PromotionType
    threshold: number
    reward: RewardType
    rewardValue: number
    productId: number | null
    categoryId: number | null
    isActive: boolean
}
