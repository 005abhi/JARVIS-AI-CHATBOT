import express from "express"
import { sendToAi } from "../controllers/ai.controller.js";

const router = express.Router()

router.route('/chat').post(sendToAi)

export default router;