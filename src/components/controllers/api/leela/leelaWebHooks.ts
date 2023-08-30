import { LeelaTgBotWebHookSchema, LeelaTgBotWebHookType } from "../validations"
import leelaTgBotApiPost from "./leelaTgBotApiPost"

const leelaWebHooks = () => {
  const tgBotPost = async (data: LeelaTgBotWebHookType) => {
    LeelaTgBotWebHookSchema.parse(data)
    return await leelaTgBotApiPost(data)
  }

  return { tgBotPost }
}

export default leelaWebHooks
