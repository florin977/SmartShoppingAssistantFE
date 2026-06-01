import { http } from "../base/http"
import type { UserModel } from "../models/UserModel"

export const UserApiClient = {
    getUser: async (): Promise<UserModel> => {
        return await http.get<UserModel>("Users/me")
    },
}
