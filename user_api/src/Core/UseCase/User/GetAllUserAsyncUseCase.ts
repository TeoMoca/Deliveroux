import { User } from "../../../Domain/User/User";
import { IUserRepository } from "../../Interfaces/User/Repository/IUserRepository";
import {IGetAllUserAsyncUseCase} from "../../Interfaces/User/UseCase/IGetAllUserAsyncUseCase";

export class GetAllUserAsyncUseCase implements IGetAllUserAsyncUseCase {
    userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(): Promise<User[]> {

        const users = await this.userRepository.getAllUsersAsync();

        return users;
    }
}