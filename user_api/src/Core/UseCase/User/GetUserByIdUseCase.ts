import {User} from "../../../Domain/User/User";
import {IGetUserByIdUseCase} from "../../Interfaces/User/UseCase/IGetUserByIdUseCase";
import {IUserRepository} from "../../Interfaces/User/Repository/IUserRepository";

export class GetUserByIdUseCase implements IGetUserByIdUseCase{
    userRepository:IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId: string): Promise<User | undefined> {
        const user = await this.userRepository.getUserByIdAsync(userId);

        return user;
    }
}