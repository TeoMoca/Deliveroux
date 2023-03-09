import {IUserRepository} from "../../Interfaces/User/Repository/IUserRepository";
import {IDeleteUserAsyncUseCase} from "../../Interfaces/User/UseCase/IDeleteUserAsyncUseCase";

export class DeleteUserAsyncUseCase implements IDeleteUserAsyncUseCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId: string): Promise<Boolean> {
        return await this.userRepository.deleteUserAsync(userId);
    }
}