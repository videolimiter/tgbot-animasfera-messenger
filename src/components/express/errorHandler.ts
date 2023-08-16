import { Request, Response, NextFunction } from "express"

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error) // выводим ошибку в консоль
  res.status(500).json({ error: "Something went wrong" }) // отправляем ответ с ошибкой клиенту
}
