export type Promotiontype = "CartTotal" | "Quantity"
export type RewardType = "FreeItems" | "PercentDiscount"

export interface PromotionModel {
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

export interface PromotionInput {
    name: string
    type: Promotiontype
    threshold: number
    reward: RewardType
    rewardValue: number
    productId?: number
    categoryId?: number
    isActive: boolean
}
