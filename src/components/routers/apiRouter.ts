import express from "express"
import apiController from "../controllers/apiController"
import verifySystemToken from "../express/verifySystemToken"

const router = express.Router()

router.post(
  "/textNotification",
  verifySystemToken,
  apiController().textNotification
)

export default router
