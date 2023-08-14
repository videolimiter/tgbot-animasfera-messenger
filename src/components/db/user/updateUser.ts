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

  let { token, ...userData } = data as any
  if (token) {
    userData.tokens = { deleteMany: {}, create: token }
  }
  const user = await db.user.update({
    where: { chatId: userData.chatId },
    data: userData,
  })
  return user
}

export default updateUser
