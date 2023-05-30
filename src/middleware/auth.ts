import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUserRequest, JwtPayload } from "../types";

const authenticateMiddleware = (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as JwtPayload;

    req.user = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { authenticateMiddleware };
