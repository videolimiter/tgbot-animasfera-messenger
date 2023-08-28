import i18next from "i18next"
import { Markup, Scenes } from "telegraf"
import { message } from "telegraf/filters"
import { LeelaContext } from "../telegramBot"

let enterConnectSceneMgsId: number | undefined
let codeFromLeelaSceneMgsId: number | undefined
let wrongEmailMgsId: number | undefined
const connectToLeelaScene = new Scenes.BaseScene<LeelaContext>("connectToLeela")

export const codeFromLeelaScene = new Scenes.BaseScene<LeelaContext>(
  "codeFromLeela"
)
codeFromLeelaScene.enter(async (ctx) => {
  const res = await ctx.reply(
    i18next.t("verifyLeelaConnect", {
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
  codeFromLeelaSceneMgsId = res.message_id
})

codeFromLeelaScene.on(message("text"), async (ctx) => {
  const inputCode = ctx.message.text
  await ctx.deleteMessage(codeFromLeelaSceneMgsId)

  ctx.scene.leave()
})
codeFromLeelaScene.action("cancel", async (ctx) => {
  if (codeFromLeelaSceneMgsId != undefined) {
    await ctx.deleteMessage(codeFromLeelaSceneMgsId)
  }
  await ctx.scene.leave()
})
connectToLeelaScene.enter(async (ctx) => {
  wrongEmailMgsId = undefined
  codeFromLeelaSceneMgsId = undefined
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
  if (wrongEmailMgsId) {
    await ctx.deleteMessage(wrongEmailMgsId)
  }
  await ctx.scene.leave()
})

connectToLeelaScene.on(message("text"), async (ctx) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const email = ctx.message.text

  if (emailRegex.test(email)) {
    if (enterConnectSceneMgsId != undefined) {
      await ctx.deleteMessage(enterConnectSceneMgsId)
    }
    if (wrongEmailMgsId != undefined) {
      await ctx.deleteMessage(wrongEmailMgsId)
    }
    ctx.scene.leave()
    ctx.scene.enter("codeFromLeela")
  } else {
    if (wrongEmailMgsId != undefined) {
      await ctx.deleteMessage(wrongEmailMgsId)
    }

    await ctx.deleteMessage()
    const res = await ctx.reply(
      i18next.t("wrongEmailFormat", {
        lng: ctx.from?.language_code || "en",
      })
    )
    wrongEmailMgsId = res.message_id
  }
})

export default connectToLeelaScene
