import {Address} from "../../../../Domain/Address/Address";

export interface IGetAddressByIdUseCase{
    execute(addressId:string): Promise<Address>;
}