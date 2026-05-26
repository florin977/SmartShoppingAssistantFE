// Received from the server (GET)
export interface CategoryModel {
    id: number
    name: string
    description?: string
}

// Sent to the server (POST, PUT)
export interface CategoryInput {
    name: string
    description?: string
}
