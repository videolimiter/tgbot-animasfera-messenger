import { Telegraf } from "telegraf"
const TelegramBot = (() => {
  let instance: Telegraf

  const createInstance = (token: string) => {
    const bot = new Telegraf(token)
    bot.catch((error: any) => {
      console.error("Telegraf Error:", error)
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
