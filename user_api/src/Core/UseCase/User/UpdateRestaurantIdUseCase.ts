import {IUserRepository} from "../../Interfaces/User/Repository/IUserRepository";
import {IUpdateRestaurantIdUseCase} from "../../Interfaces/User/UseCase/IUpdateRestaurantIdUseCase";


export class UpdateRestaurantIdUseCase implements IUpdateRestaurantIdUseCase{
    userRepository:IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId: string, restaurantId: string): Promise<Boolean> {
        const user = await this.userRepository.updateRestaurantIdAsync(userId, restaurantId);

        return user;
    }
}