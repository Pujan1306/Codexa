import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_API_URL,  // This should match your backend URL
    redirectTo: import.meta.env.VITE_FRONTEND_URL + "dashboard",
    credentials: "include"
})