import i18next from "i18next"
import { Markup, Scenes } from "telegraf"
import { message } from "telegraf/filters"
import { LeelaContext } from "../telegramBot"
import leelaWebHooks from "../../controllers/api/leela/leelaWebHooks"
import { LeelaWebHooksEvents } from "../../controllers/api/leela/types"

let enterConnectSceneMgsId: number | undefined

const connectToLeelaScene = new Scenes.BaseScene<LeelaContext>("connectToLeela")

connectToLeelaScene.enter(async (ctx) => {
  const res = await ctx.reply(
    i18next.t("connectToLeelaSceneEnter", {
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
  enterConnectSceneMgsId = res.message_id
})

connectToLeelaScene.action("cancel", async (ctx) => {
  if (enterConnectSceneMgsId) {
    await ctx.deleteMessage(enterConnectSceneMgsId)
  }
  await ctx.scene.leave()
})

connectToLeelaScene.on(message("text"), async (ctx) => {
  const inputCode = ctx.message.text
  if (inputCode === "/cancel") {
    if (enterConnectSceneMgsId) {
      await ctx.deleteMessage(enterConnectSceneMgsId)
    }
    ctx.scene.leave()
    return
  }
  const res = await leelaWebHooks().tgBotPost({
    event: LeelaWebHooksEvents.sendAccessCode,
    token: inputCode,
    chatId: ctx.chat.id,
  })

  if (res.status !== 404) {
    ctx.deleteMessage()
    if (enterConnectSceneMgsId) {
      await ctx.deleteMessage(enterConnectSceneMgsId)
    }

    ctx.reply(
      i18next.t("commandHelpReply", {
        lng: ctx.from?.language_code || "en",
      })
    )

    ctx.scene.leave()
  } else {
    ctx.reply(
      i18next.t("connectToLeelaError404", {
        lng: ctx.from?.language_code || "en",
      })
    )
  }
})

export default connectToLeelaScene
