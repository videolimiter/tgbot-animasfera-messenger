import { Request, Response, NextFunction } from "express"

const verifyUserToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  // здесь можно реализовать проверку токена на соответствие определенным критериям

  next()
}

export default verifyUserToken
