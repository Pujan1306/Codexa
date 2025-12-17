import { auth } from "../auth/auth.js";

export const protectRoute = async(req, res, next) => {
    try {
        const headers = new Headers()
        Object.entries(req.headers).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => headers.append(key, v))
            } else if (value) {
                headers.set(key, value)
            }
        })
        const session = await auth.api.getSession({headers})
        if (!session) {
            return res.status(401).json({error: "Unauthorized"})
        }

        req.user = session.user
        next()
    } catch (error) {
         console.log("Error protecting route:", error)
         return res.status(500).json({error: "Internal server error"})
    }
}