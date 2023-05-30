import { type NextFunction, type Response } from 'express'

import jwt from 'jsonwebtoken'

import { type IUserRequest, type JwtPayload } from '../types'

const authenticateMiddleware = (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    if (!process.env.JWT_SECRET_KEY) throw new Error('JWT_SECRET_KEY not found')

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload

    req.user = decoded.id

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export { authenticateMiddleware }
