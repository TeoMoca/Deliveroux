import { User } from "../../../../Domain/User/User";
import { Address } from "../../../../Domain/Address/Address";

export interface IUserRepository {
    getUserByIdAsync(userId:string) : Promise<User>;
    updateRestaurantIdAsync(userId:string, restaurantId:string) : Promise<Boolean>;
    getAddressByAddressIdAsync(userId:string) : Promise<Address>;
}