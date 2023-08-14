import db from "../db"
import { z } from "zod"
import { createUserSchema } from "./validations"

type createUserSchema = z.infer<typeof createUserSchema>
const createUser = async (data: createUserSchema) => {
  createUserSchema.parse(data)
  const existUser = await db.user.findUnique({
    where: {
      chatId: data.chatId,
    },
  })
  if (existUser) {
    return console.log("User already exist")
  }

  let { token, ...userData } = data as any
  if (token) {
    userData.tokens = { create: token }
  }
  const user = await db.user.create({ data: userData })
  return user
}

export default createUser
