import express from "express"
import { executionController } from "../controller/executionController.js"

const router = express.Router()

router.post("/", executionController)

export default router