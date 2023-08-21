import { NextFunction, Request, Response } from "express"
import TelegramBot from "../../telegram/telegramBot"
import { SendNotificationSchema, SendNotificationType } from "./validations"

const textNotificationApi = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bot = TelegramBot.getInstance(process.env.TELEGRAM_TOKEN || "")

  const data = req.body
  SendNotificationSchema.parse(data)
    const { chatId, text, buttons }: SendNotificationType = req.body

    if (buttons) {
      console.log("Buttons: ", buttons)
    }
    if (typeof chatId === "number") {
      bot.telegram
        .sendMessage(chatId, text, {
          reply_markup: {
            inline_keyboard: [
              buttons
                ? buttons.map((button) => ({
                    text: button.label,
                    callback_data: JSON.stringify(button.type),
                  }))
                : [],
            ],
          },
          parse_mode: "HTML",
        })
        .catch((err) => console.log(err))
    } else if (Array.isArray(chatId)) {
      console.log("chatId is an array:", chatId)
      const sendMessages = async (
        chatIds: number[],
        text: string
      ): Promise<void> => {
        for (const chatId of chatIds) {
          await new Promise((resolve) => setTimeout(resolve, 35)) // Задержка
          bot.telegram
            .sendMessage(chatId, text, {
              parse_mode: "HTML",
            })
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
