import type { RoleType } from "../../components/shared/types/AuthTypes"

export interface RegisterModel {
    id: number
    username: string
    role: RoleType
}
