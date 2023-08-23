import { z } from "zod"

export const MessageSchema = z.object({
  chatId: z.union([z.number(), z.array(z.number())]),
  text: z.string(),
  buttons: z
    .array(
      z.object({
        label: z.string(),
        data: z.union([
          z.object({
            callback: z.object({
              name: z.literal("messageReply"),
              roomId: z.number(),
            }),
          }),
          z.object({ url: z.string() }),
        ]),
      })
    )
    .optional(),
})

export const LeelaTgBotWebHookSchema = z.object({
  event: z.string(),
  chatId: z.number(),
  message: z.object({
    roomId: z.number(),
    message: z.string(),
  }),
})
export type LeelaTgBotWebHookType = z.infer<typeof LeelaTgBotWebHookSchema>
export type MessageType = z.infer<typeof MessageSchema>
