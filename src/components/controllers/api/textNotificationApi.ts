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
    bot.telegram
      .sendMessage(chatId, text, { parse_mode: "HTML" })
      .catch((err) => console.log(err))

    console.log("singleID: ", chatId)
  } else if (Array.isArray(chatId)) {
    console.log("chatId is an array:", chatId)

    const sendMessages = async (
      chatIds: number[],
      text: string
    ): Promise<void> => {
      for (const chatId of chatIds) {
        await new Promise((resolve) => setTimeout(resolve, 35)) // Задержка
        bot.telegram
          .sendMessage(chatId, text, { parse_mode: "HTML" })
          .catch((err) => console.log(err))
      }
    }
    sendMessages(chatId, text).then(() => console.log("Отправка окончена"))
  } else {
    return console.log("Invalid chatId type")
  }
  res.status(200).json({ message: "OK" })
  next()
}
export default textNotificationApi
