import { Request, Response } from "express"
import TelegramBot from "../telegram/telegramBot"
import db from "../db/db"
import createUserDb from "../db/user/createUser"
import updateUser from "../db/user/updateUser"
import i18next from "i18next"
require("dotenv").config()

interface ISendMessage {
  chatId: number
  text: string
}

interface ICreateUser {
  animasferaId: number
  chatId: number
  token: string
}

const apiController = () => {
  const bot = TelegramBot.getInstance(process.env.TELEGRAM_TOKEN || "")

  const sendMessage = (req: Request, res: Response) => {
    const { chatId, text }: ISendMessage = req.body
    bot.telegram.sendMessage(chatId, text)
    res.status(200).json({ message: "OK" })
  }

  const createUser = async (req: Request, res: Response) => {
    const { token, ...data }: ICreateUser = req.body

    const user = await db.user.findUnique({
      where: { chatId: data.chatId },
    })
    if (user) {
      console.log("Update User")
      updateUser({ ...data, token: { hashedToken: token } })
      bot.telegram.sendMessage(data.chatId, "/start")
    } else {
      console.log("Create new")
      console.log(data)
      createUserDb({
        ...data,
        token: { hashedToken: token.toString() },
      })
      bot.telegram.sendMessage(data.chatId, "/start")
      bot.telegram.sendMessage(data.chatId, i18next.t("successRegistration"))
    }

    res.status(200).json({ message: "OK" })
  }
  return { sendMessage, createUser }
}

export default apiController
