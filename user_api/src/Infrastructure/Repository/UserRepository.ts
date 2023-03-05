import { PrismaClient } from "@prisma/client";
import { Stripe } from "stripe";
import { IUserRepository } from "../../Core/Interfaces/User/Repository/IUserRepository";
import {UserMapperExtension} from "../Extensions/UserMapperExtension";
import { User } from "../../Domain/User/User";
import {Address} from "../../Domain/Address/Address";


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

    async updateRestaurantIdAsync(userId: string, restaurantId: string): Promise<Boolean> {
        const userEntity = await this.userDataSource.users.update({
            where:{Id:userId},
            data:{RestaurantId:restaurantId}
        })

        return true;
    }

    async getAddressByAddressIdAsync(userId: string): Promise<Address> {

        const entity = await this.userDataSource.address.findUniqueOrThrow({
            where:{Id:userId}
        });

        const address = new Address(entity.Id, entity.adressName, entity.postalCode, entity.city, entity.Country);

        return address;
    }
}