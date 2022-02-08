import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Missing Token", 401)
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: userId } = verify(token, "dc53fc4f621c80bdc2fa0329a6123708") as IPayload;
        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(userId);

        if (!user) {
            throw new AppError("user doesn't exists!", 401);
        }

        request.user = {
            id: userId
        }

        next();
    } catch {
        throw new AppError("Invalid Token", 401)
    }
}