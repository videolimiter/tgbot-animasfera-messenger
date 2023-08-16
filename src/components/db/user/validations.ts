import { z } from "zod"
export const verifyToken = z.object({
  chatId: z.number(),
  token: z.string(),
})
export const createUserSchema = z
  .object({
    chatId: z.number(),
    animasferaId: z.number().optional(),
    tgUsername: z.string().optional(),
    animasferaUsername: z.string().optional(),
    tgFirstName: z.string().optional(),
    tgLastName: z.string().optional(),
    tgLanguage: z.string().optional(),
    isBot: z.boolean().optional(),
  })
  .extend({
    tokens: z
      .object({
        hashedToken: z.string(),
        type: z.string(),
      })
      .array()
      .optional(),
  })
export const updateUserSchema = createUserSchema
export const getUserSchema = z.object({
  id: z.number().optional(),
  chatId: z.number().optional(),
  animasferaId: z.number().optional(),
  tgUsername: z.string().optional(),
  animasferaUsername: z.string().optional(),
  tgFirstName: z.string().optional(),
  tgLastName: z.string().optional(),
  tgLanguage: z.string().optional(),
  isBot: z.boolean().optional(),
})
