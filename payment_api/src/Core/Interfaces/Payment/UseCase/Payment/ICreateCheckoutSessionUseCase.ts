import { Item} from "../../../../../Domain/Item";
import {CheckoutSession} from "../../../../../Domain/CheckoutSession";
export interface ICreateCheckoutSessionUseCase{
    executeAsync(userStripeId:string, userId:string, items:Item[], commandIds:string[]): Promise<CheckoutSession | undefined>;
}