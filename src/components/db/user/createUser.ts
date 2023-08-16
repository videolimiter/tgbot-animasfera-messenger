import db from "../db"
import { z } from "zod"
import { createUserSchema } from "./validations"

type createUserSchema = z.infer<typeof createUserSchema>
const createUser = async (data: createUserSchema) => {
  try {
    createUserSchema.parse(data)
  } catch (e) {}
  const existUser = await db.user.findUnique({
    where: {
      chatId: data.chatId,
    },
  })
  if (existUser) {
    return console.log("User already exist")
  }

  let { tokens, ...userData } = data as any

  if (tokens) {
    userData.tokens = { create: tokens.map((token: any) => token) }
  }
  
  const user = await db.user.create({ data: userData })
  return user
}

export default createUser
