import { NextFunction, Request, Response } from "express"
import i18next from "i18next"
import TelegramBot from "../../telegram/telegramBot"
import db from "../../db/db"
import createUserDb from "../../db/user/createUser"
import updateUserDb from "../../db/user/updateUser"
import generateToken from "../../helpers/generateToken"

export interface ICreateUser {
  animasferaId: number
  chatId: number
  token: string
}
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const bot = TelegramBot.getInstance(process.env.TELEGRAM_TOKEN || "")
  const { token, ...data }: ICreateUser = req.body

  const tokenTgBot = generateToken()
  const tokens = [
    { hashedToken: token, type: "API_ACCESS" },
    { hashedToken: tokenTgBot, type: "TGBOT_ACCESS" },
  ]

  const user = await db.user.findUnique({
    where: { chatId: data.chatId },
  })
  if (user) {
    updateUserDb({
      ...data,
      tokens: tokens,
    })
    bot.telegram.sendMessage(
      data.chatId,
      i18next.t("successUpdateRegistration", {
        lng: user.tgLanguage || "en",
      })
    )
  } else {
    createUserDb({
      ...data,
      tokens: tokens,
    })
    bot.telegram.sendMessage(data.chatId, i18next.t("successRegistration"))
  }

  fetch(process.env.ANIMASFERA_URL + "/api/tokens", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: data.animasferaId,
      token: {
        type: "TGBOT_ACCESS",
        userId: data.animasferaId,
        hashedToken: tokenTgBot,
      },
    }),
  })
  res.status(200).json({ message: "OK" })
  next()
}

export default createUser
