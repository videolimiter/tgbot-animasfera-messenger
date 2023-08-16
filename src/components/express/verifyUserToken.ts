import { Request, Response, NextFunction } from "express"
import db from "../db/db"
import { z } from "zod"
import { verifyToken } from "../db/user/validations"

const verifyUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  const { chatId } = req.body

  try {
    verifyToken.parse({ chatId, token })
  } catch (e) {}

  const user = await db.user.findUnique({
    where: { chatId: chatId },
    include: { tokens: { where: { type: "TGBOT_ACCESS" } } },
  })

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  if (user.tokens[0].hashedToken !== token) {
    return res.status(401).json({ message: "Token error" })
  }

  next()
}

export default verifyUserToken
