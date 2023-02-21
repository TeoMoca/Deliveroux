import { PrismaClient } from "@prisma/client";
import { Stripe } from "stripe";
import { IUserRepository } from "../../Core/Interfaces/User/Repository/IUserRepository";
import {UserMapperExtension} from "../Extensions/UserMapperExtension";
import { User } from "../../Domain/User/User";


export class UserRepository implements IUserRepository {
    userDataSource: PrismaClient;
    stripeDataSource: Stripe;

    constructor(userDataSource:PrismaClient, stripeDataSource:Stripe) {
        this.userDataSource = userDataSource;
        this.stripeDataSource = stripeDataSource;
    }

    async getUserByIdAsync(userId: string): Promise<User> {
        const userEntity = await this.userDataSource.users.findUniqueOrThrow({
            where:{Id:userId}
        })

        const user = UserMapperExtension.ToDomain(userEntity);

        return user;
    }
}