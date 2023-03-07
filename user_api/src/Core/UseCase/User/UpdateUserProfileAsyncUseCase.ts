import {IUserRepository} from "../../Interfaces/User/Repository/IUserRepository";
import {Address} from "../../../Domain/Address/Address";
import {User} from "../../../Domain/User/User";
import {IUpdateUserProfileAsyncUseCase} from "../../Interfaces/User/UseCase/IUpdateUserProfileAsyncUseCase";

export class UpdateUserProfileAsyncUseCase implements IUpdateUserProfileAsyncUseCase{
    userRepository:IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId: string, user: User, address:Address): Promise<Boolean> {
        console.log(user, address);
        const userUpdated = await this.userRepository.updateUserAsync(userId, user);
        const addressUpdated = await this.userRepository.updateAddressAsync(userId, address);

        return true;
    }
}