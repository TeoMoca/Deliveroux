import { User } from "../../../../Domain/User/User";

export interface ILoginUserUseCase {
  execute(mail: String, password: String): Promise<User | undefined>;
}