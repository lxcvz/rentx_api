import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error("Missing Token")
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub } = verify(token, "dc53fc4f621c80bdc2fa0329a6123708") as IPayload;
        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(sub);

        if (!user) {
            throw new Error("user doesn't exists!")
        }

        next();
    } catch {
        throw new Error("Invalid Token")
    }
}