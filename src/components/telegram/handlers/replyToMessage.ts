import { NarrowedContext } from "telegraf"
import { LeelaContext } from "../telegramBot"
import { Message, Update } from "telegraf/typings/core/types/typegram"
import findTags from "../../helpers/findTags"

import leelaWebHooks from "../../controllers/api/leela/leelaWebHooks"
import {
  LeelaMessageTags,
  LeelaWebHooksEvents,
} from "../../controllers/api/leela/types"
import getTagTypeValue from "../../helpers/getTagTypeValue"

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
    for (var tag of foundTags) {
      const currentTag = getTagTypeValue(tag)
      if (currentTag) {
        switch (currentTag[0]) {
          case LeelaMessageTags.chat:
            leelaWebHooks().tgBotPost({
              event: LeelaWebHooksEvents.replyMessage,
              chatId: ctx.chat.id,
              message: {
                roomId: Number(currentTag[1]),
                message: text,
              },
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
}

export default replyToMessage
