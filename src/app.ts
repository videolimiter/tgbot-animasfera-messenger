import express from "express"
import TelegramBot from "./components/telegram/telegramBot"
import apiRouter from "./components/routers/apiRouter"
import i18next from "i18next"
import errorHandler from "./components/express/errorHandler"
import { message } from "telegraf/filters"
import getTagValue from "./components/helpers/getTagValue"
import findTags from "./components/helpers/findTags"
import replyToMessage from "./components/telegram/handlers/replyToMessage"

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

bot.on(message("text"), (ctx) => {
  if (ctx.message.reply_to_message) {
    replyToMessage(ctx)
  }
})

// bot.on("callback_query", async (ctx) => {
//   const data = JSON.parse(JSON.stringify(ctx.callbackQuery)).data
//   console.log(data)

//   if (JSON.parse(data).name == "messageReply") {
//     ctx.roomId = Number(JSON.parse(data).roomId)
//     await ctx.scene.enter("replyToLeelaScene")
//   }
// })
bot.launch()

app.use(errorHandler)
app.listen(port, () => {
  console.log(`Animasfera TelegramBot listening on port ${port}`)
})
