import { Context, Scenes, Telegraf } from "telegraf"
import LocalSession from "telegraf-session-local"
import connectToLeelaScene from "./scenes/connectToLeelaScene"

export interface SessionData extends Scenes.SceneSession {
  counter: number
  msg: {
    id: number
    param: object
  }[]
}
export interface LeelaContext extends Context {
  roomId: number
  params: object
  text: string
  session: SessionData
  // declare scene type
  scene: Scenes.SceneContextScene<LeelaContext>
}
const TelegramBot = (() => {
  let instance: Telegraf<LeelaContext>

  const createInstance = (token: string) => {
    const bot = new Telegraf<LeelaContext>(token)

    const localSession = new LocalSession({
      database: "tgbot_db.json",
    })

    //console.log("Current LocalSession DB:", localSession.DB)

    // Telegraf will use `telegraf-session-local` configured above middleware
    bot.use(localSession.middleware())

    bot.catch((err, ctx) => {
      console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
    })

    const stage = new Scenes.Stage<LeelaContext>([connectToLeelaScene])
    //bot.use(session())

    bot.use(stage.middleware())
    bot.use((ctx, next) => {
      ctx.params ??= {}
      // we now have access to the the fields defined above
      ctx.roomId ??= 0
      ctx.text ??= ""
      return next()
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
