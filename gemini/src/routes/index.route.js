import express from "express"
import { statusCheck } from "../controllers/status.controller.js";
import aiRouter from "./ai.route.js"

const router = express.Router()

router.route('/status').get(statusCheck);

router.use('/api/ai', aiRouter)

export default router
