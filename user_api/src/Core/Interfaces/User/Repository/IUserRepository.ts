import { User } from "../../../../Domain/User/User";
import { Address } from "../../../../Domain/Address/Address";

export interface IUserRepository {
    getUserByIdAsync(userId:string) : Promise<User>;
    updateRestaurantIdAsync(userId:string, restaurantId:string) : Promise<Boolean>;
    getAddressByAddressIdAsync(userId:string) : Promise<Address>;
    updateAddressAsync(userId:string, address:Address) : Promise<Boolean>;
    updateUserAsync(userId:string, user:User) : Promise<Boolean>;
    deleteUserAsync(userId:string) : Promise<Boolean>;
}