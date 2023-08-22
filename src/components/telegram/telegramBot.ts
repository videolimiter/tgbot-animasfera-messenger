import { Context, Scenes, Telegraf, session } from "telegraf"
import { SceneContext, SceneSessionData } from "telegraf/typings/scenes"
import replyToLeelaScene from "./Scenes/replyToLeelaScene"
export interface LeelaContext extends Context {
  // will be available under `ctx.LeelaContextProp`
  roomId: number
  text: string
  // declare scene type
  scene: Scenes.SceneContextScene<LeelaContext>
}
const TelegramBot = (() => {
  let instance: Telegraf<LeelaContext>

  const createInstance = (token: string) => {
    const bot = new Telegraf<LeelaContext>(token)
    bot.catch((err, ctx) => {
      console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
    })

    const stage = new Scenes.Stage<LeelaContext>([replyToLeelaScene])
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
