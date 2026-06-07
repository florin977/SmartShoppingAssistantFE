import type { UserModel } from "../../../api/models/UserModel"
import type { RoleType } from "./AuthTypes"

export interface User {
    id: number
    username: string
    role: RoleType
}

export interface UserSummary {
    id: number
    username: string
}

export function toUser(dto: UserModel): User {
    return {
        id: dto.id,
        username: dto.username,
        role: dto.role,
    }
}
