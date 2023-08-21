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
    const { enter, leave } = Scenes.Stage

    const greeterScene = new Scenes.BaseScene<Scenes.SceneContext>("greeter")
    greeterScene.enter((ctx) => ctx.reply("Hi"))
    greeterScene.leave((ctx) => ctx.reply("Bye"))
    greeterScene.hears("hi", (ctx) => ctx.scene.leave())
    greeterScene.on("message", (ctx) => ctx.reply("Send `hi`"))

    const stage = new Scenes.Stage([replyToLeelaScene])

    bot.use(session())
    bot.use(stage.middleware())

    bot.command("scenese", async (ctx) => ctx.scene.enter("greeter"))

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
