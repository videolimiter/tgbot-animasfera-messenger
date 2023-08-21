import { Scenes, Telegraf, session } from "telegraf"
import { SceneContext, SceneSessionData } from "telegraf/typings/scenes"
import replyToLeelaScene from "./Scenes/replyToLeelaScene"
const TelegramBot = (() => {
  let instance: Telegraf<SceneContext<SceneSessionData>>

  const createInstance = (token: string) => {
    const bot = new Telegraf<Scenes.SceneContext>(token)
    bot.catch((err, ctx) => {
      console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
    })

    const stage = new Scenes.Stage([replyToLeelaScene])
    bot.use(session())
    bot.use(stage.middleware())

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
