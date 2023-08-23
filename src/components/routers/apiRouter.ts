import express from "express"
import verifySystemToken from "../express/verifySystemToken"
import apiController from "../controllers/api/apiController"

const router = express.Router()

router.post("/message", verifySystemToken, apiController().message)

export default router
