import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_API_URL,
    redirectURL: import.meta.env.VITE_FRONTEND_URL + "/dashboard",
    fetchOptions: {
        credentials: "include"
    }
})