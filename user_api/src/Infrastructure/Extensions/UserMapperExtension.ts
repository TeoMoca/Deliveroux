import { User } from "../../Domain/User/User";
import { Users } from "@prisma/client";

export class UserMapperExtension {
    static ToDomain(
        entity:Users
    ): User {
        return{
            id:entity.Id,
            roleId:entity.Id_Role,
            addressId:entity.Id_Address,
            firstname:entity.FirstName,
            lastname:entity.LastName,
            phone:entity.Phone,
            mail:entity.Mail,
            password:entity.Password,
            isdisabled:entity.IsDisabled,
            stripeId: entity.stripeId as string,
            restaurantId: entity.RestaurantId || undefined
        };
    }
}