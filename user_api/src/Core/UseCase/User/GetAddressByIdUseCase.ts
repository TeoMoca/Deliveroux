import {Address} from "../../../Domain/Address/Address";
import {IUserRepository} from "../../Interfaces/User/Repository/IUserRepository";
import {IGetAddressByIdUseCase} from "../../Interfaces/User/UseCase/IGetAddressByIdUseCase";

export class GetAddressByIdUseCase implements IGetAddressByIdUseCase{
    userRepository:IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(addressId: string): Promise<Address> {
        const address = await this.userRepository.getAddressByAddressIdAsync(addressId);

        return address;
    }
}