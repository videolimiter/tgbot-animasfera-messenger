import ApiClient from "../bot/apiClient"
import { LeelaTgBotWebHookType } from "../validations"
import { LeelaWebHookPaths } from "./types"

const leelaTgBotApi = async ({
  event,
  roomId,
  message,
}: LeelaTgBotWebHookType) => {
  const res = await ApiClient.makeApiRequest(
    process.env.ANIMASFERA_URL + LeelaWebHookPaths.tgBot,
    "POST",
    {
      event: event,
      roomId: roomId,
      message: message,
    }
  )
}

export default leelaTgBotApi
