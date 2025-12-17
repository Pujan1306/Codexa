import { executeCode } from "../lib/piston.js";

export const executionController = async (req, res) => {
    try {
        const {language, code} = req.body;
        if(!language || !code) {
            return res.status(400).json({error: "Language and code are required"})
        } 

        const result = await executeCode(language, code)
        return res.json(result)
    } catch (error) {
        console.error("Execution error:", error);
        res.status(500).json({ error: "Failed to execute code" });
    }
 
}