import i18next from "i18next"
import { Scenes } from "telegraf"
import { message } from "telegraf/filters"

const replyToLeelaScene = new Scenes.BaseScene<Scenes.SceneContext>("greeter")
let enterSceneMgsId: number
replyToLeelaScene.enter((ctx) => {
  ctx.reply(
    i18next.t("replyToLeelaSceneEnter", {
      lng: ctx.from?.language_code || "en",
    }),
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: i18next.t("Cancel", {
                lng: ctx.from?.language_code || "en",
              }),
              callback_data: "cancel",
            },
          ],
        ],
      },
    }
  )
  enterSceneMgsId = ctx.message!.message_id + 1
})

replyToLeelaScene.action("cancel", (ctx) => {
  ctx.scene.leave()
  ctx.deleteMessage()
})

replyToLeelaScene.on(message("text"), (ctx) => {
  ctx.deleteMessage(enterSceneMgsId)
  ctx.reply(
    i18next.t("replyToLeelaSceneLeave", {
      lng: ctx.from?.language_code || "en",
    })
  )

  ctx.scene.leave()
})

export default replyToLeelaScene
