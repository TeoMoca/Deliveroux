import { User } from "../../../../Domain/User/User";
import { Address } from "../../../../Domain/Address/Address";

export interface IUserRepository {
    getUserByIdAsync(id:string): Promise<User>;
    getAllUserAsync(): Promise<User[]>
    updateUserByIdAsync(user:User): Promise<Boolean>
    deleteUserAsync(userId:string): Promise<Boolean>
}