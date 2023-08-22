import { Request, Response, NextFunction } from "express"
import messageApi from "./api/messageApi"
require("dotenv").config()

const apiController = () => {
  const message = (req: Request, res: Response, next: NextFunction) =>
    messageApi(req, res, next)
  return { message }
}

export default apiController
