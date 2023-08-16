import { Request, Response, NextFunction } from "express"
import TelegramBot from "../telegram/telegramBot"
import createUserApi from "./api/createUser"
require("dotenv").config()

export interface ISendMessage {
  chatId: number
  text: string
}

const apiController = () => {
  const bot = TelegramBot.getInstance(process.env.TELEGRAM_TOKEN || "")

  const textNotification = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { chatId, text }: ISendMessage = req.body
    bot.telegram.sendMessage(chatId, text)
    res.status(200).json({ message: "OK" })
    next()
  }

  const createUser = (req: Request, res: Response, next: NextFunction) =>
    createUserApi(req, res, next)

  return { textNotification, createUser }
}

export default apiController
