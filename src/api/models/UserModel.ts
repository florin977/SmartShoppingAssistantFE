import type { RoleType } from "../../components/shared/types/AuthTypes"

export interface UserModel {
    id: number
    username: string
    role: RoleType
}
