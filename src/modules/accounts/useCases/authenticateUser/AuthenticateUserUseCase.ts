import { sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt"

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    }
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }


    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error("E-mail or password invalid");
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error("E-mail or password invalid");
        }

        const token = sign({}, "dc53fc4f621c80bdc2fa0329a6123708", {
            subject: user.id,
            expiresIn: "1d"
        })

        return {
            user: {
                name: user.name,
                email: user.email
            },
            token
        };

    }
}

export { AuthenticateUserUseCase }