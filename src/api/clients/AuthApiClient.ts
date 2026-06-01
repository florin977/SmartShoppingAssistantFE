import type { LoginCredentials, RegisterCredentials } from "../../components/shared/types/AuthTypes"
import { http } from "../base/http"
import type { RegisterModel } from "../models/AuthModel"

export const AuthApiClient = {
    login: async (credentials: LoginCredentials): Promise<string> => {
        return await http.post<string>("/Auth/login", credentials)
    },
    register: async (credentials: RegisterCredentials): Promise<RegisterModel> => {
        return await http.post<RegisterModel>("/Auth/register", credentials)
    },
    logout: async (): Promise<void> => {
        await http.post<void>("/Auth/logout", null)
    },
    logoutAll: async (): Promise<void> => {
        await http.post<void>("/Auth/logoutAll", null)
    },
}
