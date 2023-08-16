import db from "../db"
import { z } from "zod"
import { updateUserSchema } from "./validations"

type updateUserSchema = z.infer<typeof updateUserSchema>
const updateUser = async (data: updateUserSchema) => {
  updateUserSchema.parse(data)

  const existUser = await db.user.findUnique({
    where: {
      chatId: data.chatId,
    },
  })
  if (!existUser) {
    return console.log("User not found")
  }

  let { tokens, ...userData } = data as any
  if (tokens) {
    userData.tokens = {
      deleteMany: {},
      create: tokens.map((token: any) => token),
    }
    // { , create: token }
  }
  const user = await db.user.update({
    where: { chatId: userData.chatId },
    data: userData,
  })
  return user
}

export default updateUser
