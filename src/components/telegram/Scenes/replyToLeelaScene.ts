import i18next from "i18next"
import { Markup, Scenes } from "telegraf"
import { message } from "telegraf/filters"

const replyToLeelaScene = new Scenes.BaseScene<Scenes.SceneContext>(
  "replyToLeelaScene"
)
let enterSceneMgsId: number
let replyMessageId: number
replyToLeelaScene.enter(async (ctx) => {
  const res = await ctx.reply(
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

  console.log(res.message_id)
  enterSceneMgsId = res.message_id
  replyMessageId = ctx.callbackQuery!.message!.message_id
})

replyToLeelaScene.action("cancel", async (ctx) => {
  console.log(ctx.callbackQuery.message?.message_id)
  await ctx.scene.leave()
  await ctx.deleteMessage()
})

replyToLeelaScene.on(message("text"), async (ctx) => {
  await ctx.deleteMessage(enterSceneMgsId)
  await ctx.reply(
    i18next.t("replyToLeelaSceneLeave", {
      lng: ctx.from?.language_code || "en",
    })
  )
  await ctx.telegram.editMessageReplyMarkup(
    ctx.from.id,
    replyMessageId,
    undefined,
    {
      inline_keyboard: [
        [Markup.button.url("Вы ответили за базар", "https://www.google.com")],
      ],
    }
  )
  await ctx.scene.leave()
})

export default replyToLeelaScene
