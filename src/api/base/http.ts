import axios, { type AxiosRequestConfig } from "axios"

let isRefreshing = false
let refreshSubscribers: ((error: Error | null) => void)[] = []

const onRefreshed = (error: Error | null) => {
    refreshSubscribers.forEach((callback) => callback(error))
    refreshSubscribers = []
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
})

api.interceptors.response.use(
    // Success
    (response) => response,

    // Error
    async (error) => {
        const data = error.response?.data
        const message = typeof data === "string" && data !== "" ? data : error.message || "Request failed"
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (originalRequest.url?.includes("/Auth/refresh")) {
                //window.location.href = "/auth/login"
                return Promise.reject(new Error(message))
            }

            originalRequest._retry = true

            if (!isRefreshing) {
                isRefreshing = true

                try {
                    await axios.post(`${import.meta.env.VITE_API_URL}/Auth/refresh`, {}, { withCredentials: true })

                    isRefreshing = false
                    onRefreshed(null)

                    return api(originalRequest)
                } catch (refreshError) {
                    isRefreshing = false
                    onRefreshed(new Error("Refresh failed"))
                    //window.location.href = "/auth/login"

                    return Promise.reject(refreshError)
                }
            }

            return new Promise((resolve, reject) => {
                refreshSubscribers.push((err: Error | null) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(api(originalRequest))
                    }
                })
            })
        }

        return Promise.reject(new Error(message))
    },
)

export const http = {
    get: async <T>(path: string, config?: AxiosRequestConfig): Promise<T> => {
        const response = await api.get<T>(path, config)
        return response.data
    },

    post: async <T>(path: string, body: unknown): Promise<T> => {
        const response = await api.post<T>(path, body)
        return response.data
    },

    put: async <T>(path: string, body: unknown): Promise<T> => {
        const response = await api.put<T>(path, body)
        return response.data
    },

    remove: async <T>(path: string): Promise<T> => {
        const response = await api.delete<T>(path)
        return response.data
    },
}
