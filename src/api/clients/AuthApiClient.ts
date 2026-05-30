import type { LoginCredentials, RegisterCredentials } from "../../components/shared/types/AuthTypes"
import { http } from "../base/http"
import type { RegisterModel } from "../models/AuthModel"

export const AuthApiClient = {
    login: async (credentials: LoginCredentials): Promise<string> => {
        return await http.post<string>("/Users/login", credentials)
    },
    register: async (credentials: RegisterCredentials): Promise<RegisterModel> => {
        return await http.post<RegisterModel>("/Users/register", credentials)
    },
}
