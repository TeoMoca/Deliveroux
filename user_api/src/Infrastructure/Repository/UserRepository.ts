import { PrismaClient } from "@prisma/client";
import {Stripe} from "stripe";
import { IUserRepository } from "../../Core/Interfaces/Repository/User/IUserRepository";
import { Address } from "../../Domain/Address/Address";
import { User } from "../../Domain/User/User";
import { UserMapper } from "../Extension/UserExtension";

export class UserRepository implements IUserRepository{
    userDatasource: PrismaClient;
    stripeDataSource;
    constructor(userDatasource: PrismaClient, stripeDataSource:Stripe){
        this.userDatasource = userDatasource;
        this.stripeDataSource = stripeDataSource;
    }

    async getUserByIdAsync(id: string): Promise<User> {
        const userEntity = await this.userDatasource.users.findUniqueOrThrow({
            where:{Id: id}, 
            include:{
                Address:true
            }          
        });

        const user = UserMapper.ToDomain(userEntity);
        return user;
    }

    async getAllUserAsync(): Promise<User[]> {
        const data = await this.userDatasource.users.findMany();
        var user: User[] = [];
        for(const users of data){
            const userToAdd = UserMapper.ToDomain(users);
            user.push(userToAdd);
        }

        return user;
    }

    async deleteUserAsync(userId: string): Promise<Boolean> {
        await this.userDatasource.users.delete({
            where:{Id: userId}
        });

        return true;
    }

    async updateUserByIdAsync(user: User): Promise<Boolean> {
        await this.userDatasource.users.update({
            where:{Id: user.id},
            data:{
                Id_Role: user.roleId,
                Id_Address: user.addressId,
                FirstName: user.firstname,
                LastName: user.lastname,
                Password: user.password,
                Mail: user.mail,
                IsDisabled: user.isdisabled,
                Phone: user.phone,
                
            }
        });
    
        return true;
    }
}