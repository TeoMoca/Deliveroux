import { User } from "../../../Domain/User/User";
import {ILoginUserUseCase} from "../../Interface/Connexion/UseCase/ILoginUserUseCase"
import { IConnexionRepository } from "../../Interface/Connexion/Repository/IConnexionRepository";

export class LoginUserUseCase implements ILoginUserUseCase {
  connexionRepository: IConnexionRepository;
  constructor(userRepository: IConnexionRepository) {
    this.connexionRepository = userRepository;
  }

  async execute(mail: String, password: String): Promise<User | undefined> {
    const data = await this.connexionRepository.LoginUser(mail, password);

    return data;
  }
}