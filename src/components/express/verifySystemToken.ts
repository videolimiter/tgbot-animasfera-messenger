import { Request, Response, NextFunction } from "express"
require("dotenv").config()

const verifySystemToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  if (process.env.SYSTEM_TOKEN !== token) {
    return res.status(401).json({ message: "token failed" })
  }

  next()
}

export default verifySystemToken
