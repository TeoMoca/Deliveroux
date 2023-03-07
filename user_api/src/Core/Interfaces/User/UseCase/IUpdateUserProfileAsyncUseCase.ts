import {User} from "../../../../Domain/User/User";
import {Address} from "../../../../Domain/Address/Address";

export interface IUpdateUserProfileAsyncUseCase {
    execute(userId: string, user: User, address:Address): Promise<Boolean>;
}