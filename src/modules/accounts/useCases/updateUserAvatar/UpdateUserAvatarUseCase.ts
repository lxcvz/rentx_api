import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { deletFile } from "../../../../utils/file"

interface IRequest {
    userId: string;
    avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ userId, avatarFile }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(userId);

        if (user.avatar) await deletFile(`./temp/avatar/${user.avatar}`);

        user.avatar = avatarFile;

        await this.usersRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase }