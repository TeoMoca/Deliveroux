import {User} from "../../../../Domain/User/User";

export interface IGetUserByIdUseCase{
    execute(userId:string): Promise<User | undefined>;
}