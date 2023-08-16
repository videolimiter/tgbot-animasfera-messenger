import crypto from "crypto"

const generateToken = (): string => {
  const token = crypto.randomBytes(32).toString("hex")
  return token
}
export default generateToken
