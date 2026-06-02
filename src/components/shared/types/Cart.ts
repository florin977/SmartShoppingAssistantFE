import type { CartModel } from "../../../api/models/CartModel"

export interface CartItem {
    id: number
    productId: number
    productName: string
    unitPrice: number
    quantity: number
    subtotal: number
}

export interface AppliedPromotion {
    promotionId: number
    promotionName: string
    discount: number
}

export interface Cart {
    items: CartItem[]
    subtotal: number
    appliedPromotions: AppliedPromotion[]
    totalDiscount: number
    total: number
    itemCount: number
}

export function toCartModel(dto: CartModel): Cart {
    return {
        items: dto.items.map((item) => ({
            id: item.id,
            productId: item.productId,
            productName: item.productName,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            subtotal: item.subtotal,
        })),
        subtotal: dto.subtotal,
        appliedPromotions: dto.appliedPromotions.map((promotion) => ({
            promotionId: promotion.promotionId,
            promotionName: promotion.promotionName,
            discount: promotion.discount,
        })),
        totalDiscount: dto.totalDiscount,
        total: dto.total,
        itemCount: dto.items.reduce((sum, item) => sum + item.quantity, 0),
    }
}
