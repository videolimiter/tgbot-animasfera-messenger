import { NarrowedContext } from "telegraf"
import { LeelaContext } from "../telegramBot"
import { Message, Update } from "telegraf/typings/core/types/typegram"
import findTags from "../../helpers/findTags"
import getTagValue from "../../helpers/getTagValue"
import leelaWebHooks from "../../controllers/api/leela/leelaWebHooks"
import {
  LeelaMessageTags,
  LeelaWebHooksEvents,
} from "../../controllers/api/leela/types"

const replyToMessage = (
  ctx: NarrowedContext<
    LeelaContext,
    Update.MessageUpdate<Record<"text", {}> & Message.TextMessage>
  >
) => {
  const replyMsgText = JSON.parse(
    JSON.stringify(ctx.message.reply_to_message)
  ).text
  const text = ctx.message.text
  const foundTags = findTags(replyMsgText)
  if (foundTags) {
    if (foundTags.length === 1) {
      switch (foundTags[0]) {
        case LeelaMessageTags.chat:
          leelaWebHooks().tgBot({
            event: LeelaWebHooksEvents.replyMessage,
            roomId: Number(getTagValue(replyMsgText, LeelaMessageTags.chat)),
            message: { chatId: ctx.chat.id, body: text },
          })
          break

        case LeelaMessageTags.booking:
          {
            console.log("booking")
          }
          break
      }
    }
  }
}

export default replyToMessage
