import { Request, Response, NextFunction } from "express"
import textNotificationApi from "./api/textNotificationApi"
require("dotenv").config()

const apiController = () => {
  const textNotification = (req: Request, res: Response, next: NextFunction) =>
    textNotificationApi(req, res, next)

  return { textNotification }
}

export default apiController
