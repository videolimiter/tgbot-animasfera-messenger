import express from "express"
import TelegramBot from "./components/telegram/telegramBot"
import apiRouter from "./components/routers/apiRouter"
import i18next from "i18next"
import { login } from "telegraf/typings/button"
import getUser from "./components/db/user/getUser"
import createUser from "./components/db/user/createUser"
import db from "./components/db/db"
import updateUser from "./components/db/user/updateUser"
require("dotenv").config()

const app = express()
const port = 3333

i18next.init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: { translation: require("./locales/en/telegram.json") },
    ru: { translation: require("./locales/ru/telegram.json") },
  },
})

const telegramBotToken = process.env.TELEGRAM_TOKEN || ""
const bot = TelegramBot.getInstance(telegramBotToken)

bot.launch()

bot.start(async (ctx) => {
  try {
    const user = await getUser({ where: { chatId: ctx.from.id } })
    if (user) {
      if (
        ctx.from.language_code &&
        user.tgLanguage !== ctx.from.language_code
      ) {
        await updateUser({
          chatId: ctx.from.id,
          tgLanguage: ctx.from.language_code,
        })
      }
      ctx.reply(i18next.t("greeting", { lng: ctx.from?.language_code || "ru" }))
    } else {
      const user = await createUser({
        chatId: ctx.from.id,
        tgFirstName: ctx.from.first_name || undefined,
        tgLanguage: ctx.from.language_code || "ru",
      })
      if (user) {
        ctx.reply("Пользователь создан")
      }
    }
  } catch (error) {}
})

process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))

app.use(express.json())

app.use("/api", apiRouter)

app.listen(port, () => {
  console.log(`Animasfera TelegramBot listening on port ${port}`)
})
