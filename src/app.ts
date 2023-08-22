import express, { NextFunction, Request, Response } from "express"
import TelegramBot from "./components/telegram/telegramBot"
import apiRouter from "./components/routers/apiRouter"
import i18next from "i18next"
import errorHandler from "./components/express/errorHandler"


require("dotenv").config()

const app = express()
const port = 5000
const bot = TelegramBot.getInstance(process.env.TELEGRAM_TOKEN || "")

i18next.init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: { translation: require("./locales/en/telegram.json") },
    ru: { translation: require("./locales/ru/telegram.json") },
  },
})

app.use(express.json())

app.use("/api", apiRouter)

process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))

bot.start((ctx) => {
  ctx.reply(
    i18next.t("greeting", {
      lng: ctx.from?.language_code || "en",
    })
  )
})
bot.launch()

app.use(errorHandler)
app.listen(port, () => {
  console.log(`Animasfera TelegramBot listening on port ${port}`)
})
