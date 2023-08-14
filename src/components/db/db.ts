import { PrismaClient } from "@prisma/client"

const db = (() => {
  let instance: PrismaClient

  const init = () => {
    instance = new PrismaClient()
  }

  const getInstance = () => {
    if (!instance) {
      init()
    }

    return instance
  }

  return {
    getInstance,
  }
})()

export default db.getInstance()
