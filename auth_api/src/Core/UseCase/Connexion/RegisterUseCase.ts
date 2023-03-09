import { Address } from "../../../Domain/Address/Address";
import { User } from "../../../Domain/User/User";
import { IConnexionRepository } from "../../Interface/Connexion/Repository/IConnexionRepository";
import { IRegisterUserUseCase } from "../../Interface/Connexion/UseCase/IRegisterUseCase";
import { randomUUID } from "crypto";

export class RegisterUserUseCase implements IRegisterUserUseCase {
  connexionRepository: IConnexionRepository;
  constructor(userRepository: IConnexionRepository) {
    this.connexionRepository = userRepository;
  }

  async execute(user: User, address:Address, sponsor:string | undefined): Promise<Boolean> {
    user.id = randomUUID();
    const userCreated = await this.connexionRepository.registerUser(
      user,
      address,
        sponsor
    );

    return userCreated;
  }
}