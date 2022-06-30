import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";

type IPayload = {
  sub: string;
};

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(token, auth.secret_token) as IPayload;

    request.user = {
      id: userId,
    };

    next();
  } catch (err) {
    throw new AppError("Invalid token", 401);
  }
}
