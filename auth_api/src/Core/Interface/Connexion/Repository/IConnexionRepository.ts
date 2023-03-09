import { User } from "../../../../Domain/User/User";
import { Address } from "../../../../Domain/Address/Address";

export interface IConnexionRepository {
    registerUser(user: User, Adress: Address, sponsor: string | undefined): Promise<Boolean>;
    LoginUser(mail: String, password: String): Promise<User | undefined>;
  }