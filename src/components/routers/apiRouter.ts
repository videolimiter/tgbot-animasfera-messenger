import Router from "express"
import apiController from "../controllers/apiController"
import verifySystemToken from "../express/verifySystemToken"

const router = Router()
router.post("/sendMessage", apiController().sendMessage)
router.post("/createUser", verifySystemToken, apiController().createUser)
export default router
