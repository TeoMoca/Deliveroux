import { Address } from "../../../../Domain/Address/Address";
import { User } from "../../../../Domain/User/User";

export interface IRegisterUserUseCase {
    execute(user: User, address:Address, sponsor:string | undefined): Promise<Boolean>;
  }