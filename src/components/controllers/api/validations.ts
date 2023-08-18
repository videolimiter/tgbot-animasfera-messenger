import { z, ZodUnion, ZodArray } from "zod"

const NumberArray = z.array(z.number())
const ChatId = z.union([z.number(), NumberArray])

export const SendTextMessage = z.object({
  chatId: ChatId,
  text: z.string(),
})

export type SendTextMessageType = z.infer<typeof SendTextMessage>
