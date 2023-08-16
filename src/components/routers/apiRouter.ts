import express, { Request, Response, NextFunction } from "express"
import apiController from "../controllers/apiController"
import verifySystemToken from "../express/verifySystemToken"
import verifyUserToken from "../express/verifyUserToken"

const router = express.Router()

router.post(
  "/textNotification",
  verifyUserToken,
  apiController().textNotification
)
router.post("/createUser", verifySystemToken, apiController().createUser)
export default router
