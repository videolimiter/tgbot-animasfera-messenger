import db from "../db"
import { z } from "zod"
import { getUserSchema } from "./validations"
import { Prisma } from "@prisma/client"

interface GetUsersInput extends Pick<Prisma.UserFindUniqueArgs, "where"> {}

type getUserSchema = z.infer<typeof getUserSchema>

const getUser = async ({ where }: GetUsersInput) => {
  getUserSchema.parse(where)

  const user = await db.user.findUnique({ where })

  return user
}

export default getUser
