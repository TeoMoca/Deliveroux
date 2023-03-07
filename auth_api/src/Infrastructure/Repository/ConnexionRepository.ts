import { PrismaClient } from "@prisma/client";
import { Stripe } from "stripe";
import { IConnexionRepository } from "../../Core/Interface/Connexion/Repository/IConnexionRepository";
import { Address } from "../../Domain/Address/Address";
import { User } from "../../Domain/User/User";
import { Role } from '../../../../user_api/src/Domain/Role/Role';
import { ConnexionMapper } from "./Extensions/ConnexionExtensions";


export class ConnexionRepository implements IConnexionRepository {
    connexionDataSource: PrismaClient;
    stripeDataSource: Stripe;
    constructor(connexionDataSource: PrismaClient, stripeDataSource: Stripe){
        this.connexionDataSource = connexionDataSource;
        this.stripeDataSource = stripeDataSource;
    }

    async registerUser(user: User, adress: Address, sponsor: string | undefined): Promise<Boolean> {
       
        const stripeId = await this.stripeDataSource.customers.create({
            phone: user.phone,
            name: user.firstname + "" + user.lastname,
        });

        if(sponsor != undefined){
            const sponsorship: string= sponsor as string;
            const userSponsor = await this.connexionDataSource.users.findFirst({
                where:{ Mail: sponsorship}
            });

            if(userSponsor != null)
                await this.connexionDataSource.users.update({
                    where:{Id: userSponsor.Id},
                    data:{ IsSponsor: true}
                });
        }

         await this.connexionDataSource.address.create({
            data:{
               Id: adress.id,
               adressName: adress.adress,
               city:adress.city,
               postalCode:adress.codePostal,
               Country: adress.country,
               IsDisabled: false
            }
        })

        await this.connexionDataSource.users.create({
            data:{
                Id: user.id,
                Id_Role: user.roleId,
                Id_Address: user.addressId,
                FirstName:user.firstname, 
                LastName:user.lastname,
                Password: user.password,
                Mail:user.mail,
                Phone:user.phone,
                stripeId: stripeId.id,
                IsDisabled:false,
                IsSponsor: false,                
            }
        });
        
        return true;
    }

    async LoginUser(mail: String, password: String): Promise<User | undefined> {
        const datas = await this.connexionDataSource.users.findMany({
            include:{
                Roles: true,
                Address:true
            },
        });

        for(const data of datas){
            if(data.Mail == mail && data.Password == password){
                const userCreated = ConnexionMapper.ToDomain(data);

                return userCreated;
            }
        }

        return undefined;
    }
}