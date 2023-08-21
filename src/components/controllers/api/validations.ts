import { number, z } from "zod"

export const SendNotificationSchema = z.object({
  chatId: z.union([z.number(), z.array(z.number())]),
  text: z.string(),
  buttons: z.array(
    z.object({
      url: z.string().optional(),
      params: z.object({}).optional(),
      type: z.string(),
      label: z.string(),
    })
  ),
})

export type SendNotificationType = z.infer<typeof SendNotificationSchema>
