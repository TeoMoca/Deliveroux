import {CheckoutSession} from "../../../../Domain/CheckoutSession";
import {Item} from "../../../../Domain/Item";

export interface IPaymentRepository {
    createCheckoutSessionAsync(userStripeId:string, commandId:string, items:Item[], commandIds:string[]): Promise<CheckoutSession | undefined>;
}