import express, { Request, Response, NextFunction } from "express"
import TelegramBot from "./components/telegram/telegramBot"
import apiRouter from "./components/routers/apiRouter"
import i18next from "i18next"
import getUser from "./components/db/user/getUser"
import createUser from "./components/db/user/createUser"
import updateUser from "./components/db/user/updateUser"
import errorHandler from "./components/express/errorHandler"

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

bot.on("message", (ctx) => {
  const message = ctx.message
  console.log(message)
})

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
    } else {
      const user = await createUser({
        chatId: ctx.from.id,
        tgFirstName: ctx.from.first_name || undefined,
        tgLanguage: ctx.from.language_code || "ru",
      })
      if (user) {
      }
    }
  } catch (error) {}
})

process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))
bot.launch()

app.use(express.json())

app.use("/api", apiRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Animasfera TelegramBot listening on port ${port}`)
})
