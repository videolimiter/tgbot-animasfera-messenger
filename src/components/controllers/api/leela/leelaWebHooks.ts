import { LeelaTgBotWebHookSchema, LeelaTgBotWebHookType } from "../validations"
import leelaTgBotApi from "./leelaTgBotApi"

const leelaWebHooks = () => {
  const tgBot = (data: LeelaTgBotWebHookType) => {
    LeelaTgBotWebHookSchema.parse(data)
    leelaTgBotApi(data)
  }
  return { tgBot }
}

export default leelaWebHooks
