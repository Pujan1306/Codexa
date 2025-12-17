import { chatClient } from "../lib/stream.js";

export const getStreamToken = async (req, res) => {
    try {
        const token = chatClient.createToken(req.user?.id)    
        return res.status(200).json({
            token,
            userId: req.user?.id,
            name: req.user?.name,
            image: req.user?.image
        })
    } catch (error) {
        console.log("Error creating token:", error)
        return res.status(500).json({error: "Error creating token"})
    }
}