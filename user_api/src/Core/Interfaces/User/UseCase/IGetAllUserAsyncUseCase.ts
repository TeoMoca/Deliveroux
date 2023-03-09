import { User } from "../../../../Domain/User/User";

export interface IGetAllUserAsyncUseCase{
    execute(): Promise<User[]>;
}