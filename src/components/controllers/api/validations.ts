import { number, z } from "zod"

export const SendNotificationSchema = z.object({
  chatId: z.union([z.number(), z.array(z.number())]),
  text: z.string(),
  buttons: z
    .array(
      z.object({
        label: z.string(),
        data: z.union([
          z.object({
            callback: z.union([
              z.object({
                name: z.literal("messageReply"),
                roomId: z.number(),
              }),
              z.object({ name: z.string() }),
            ]),
          }),
          z.object({ url: z.string() }),
        ]),
      })
    )
    .optional(),
})

export type SendNotificationType = z.infer<typeof SendNotificationSchema>
