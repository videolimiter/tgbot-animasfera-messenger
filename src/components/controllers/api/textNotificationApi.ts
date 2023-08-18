import { NextFunction, Request, Response } from "express"
import TelegramBot from "../../telegram/telegramBot"
import { SendTextMessage, SendTextMessageType } from "./validations"

const textNotificationApi = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bot = TelegramBot.getInstance(process.env.TELEGRAM_TOKEN || "")
  const data = req.body
  SendTextMessage.parse(data)
  const { chatId, text }: SendTextMessageType = req.body

  if (typeof chatId === "number") {
    bot.telegram.sendMessage(chatId, text, { parse_mode: "HTML" })
  } else if (Array.isArray(chatId)) {
    chatId.forEach((chatId: number) => {
      bot.telegram.sendMessage(chatId, text, { parse_mode: "HTML" })
    })
    console.log("chatId is an array:", chatId)
  } else {
    console.log("Invalid chatId type")
  }
  res.status(200).json({ message: "OK" })
  next()
}
export default textNotificationApi
