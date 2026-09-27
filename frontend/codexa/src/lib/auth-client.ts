import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    // Same-origin: no baseURL needed, requests go to /api/auth on this host
    fetchOptions: {
        credentials: "include"
    }
})