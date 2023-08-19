import { Telegraf } from "telegraf"
const TelegramBot = (() => {
  let instance: Telegraf

  const createInstance = (token: string) => {
    const bot = new Telegraf(token)
    bot.catch((err, ctx) => {
      console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
    })
    return bot
  }

  return {
    getInstance: (token: string) => {
      if (!instance) {
        instance = createInstance(token)
      }
      return instance
    },
  }
})()

export default TelegramBot
