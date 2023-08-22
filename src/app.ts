import express, { NextFunction, Request, Response } from "express"
import TelegramBot, { LeelaContext } from "./components/telegram/telegramBot"
import apiRouter from "./components/routers/apiRouter"
import i18next from "i18next"
import errorHandler from "./components/express/errorHandler"
import { Context, Scenes } from "telegraf"

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

bot.start(async (ctx) => {
  await ctx.reply(
    i18next.t("greeting", {
      lng: ctx.from?.language_code || "en",
    })
  )
})
// bot.action("messageReply", async (ctx) => ctx.scene.enter("replyToLeelaScene"))

bot.on("callback_query", async (ctx: LeelaContext) => {
  const data = JSON.parse(JSON.stringify(ctx.callbackQuery)).data
  if (JSON.parse(data).name == "messageReply") {
    console.log(JSON.parse(data).roomId)
    ctx.roomId = Number(JSON.parse(data).roomId)
    await ctx.scene
      .enter("replyToLeelaScene")
      .then(() => console.log("ebana ", ctx.text))
  }
  console.log(data)
})

bot.launch()

app.use(errorHandler)
app.listen(port, () => {
  console.log(`Animasfera TelegramBot listening on port ${port}`)
})
