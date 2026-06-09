import type { AnalysisModel } from "../../../api/models/AnalysisModel"

export interface Suggestion {
    productId: number,
    name: string
    price: number
    quantity: number
    reason: string
    savings: number | null
}

export interface Analysis {
    summary: string
    suggestions: Suggestion[]
}

export function toAnalysis(dto: AnalysisModel): Analysis {
    return {
        summary: dto.summary,
        suggestions: dto.suggestions.map((suggestion) => ({
            productId: suggestion.productId,
            name: suggestion.name,
            price: suggestion.price,
            quantity: suggestion.quantity,
            reason: suggestion.reason,
            savings: suggestion.savings,
        })),
    }
}