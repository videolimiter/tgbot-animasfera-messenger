import ApiClient from "../bot/apiClient"
import { LeelaTgBotWebHookType } from "../validations"
import { LeelaWebHookPaths } from "./types"

const leelaTgBotApiPost = async (data: LeelaTgBotWebHookType) => {
  const res = await ApiClient.makeApiRequest(
    process.env.ANIMASFERA_URL + LeelaWebHookPaths.tgBot,
    "POST",
    data
  )
  return res
}

export default leelaTgBotApiPost
