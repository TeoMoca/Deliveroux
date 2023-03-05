import {CheckoutSession} from "../../../Domain/CheckoutSession";
import {Item} from "../../../Domain/Item";
import {IPaymentRepository} from "../../Interfaces/Payment/Repository/IPaymentRepository";
import {ICreateCheckoutSessionUseCase} from "../../Interfaces/Payment/UseCase/Payment/ICreateCheckoutSessionUseCase";
export class CreateCheckoutSessionUseCase implements ICreateCheckoutSessionUseCase{
    paymentRepository:IPaymentRepository;
    constructor(paymentRepository:IPaymentRepository){
        this.paymentRepository = paymentRepository;
    }
    async executeAsync(userStripeId:string, userId:string, items:Item[], commandIds:string[]): Promise<CheckoutSession | undefined>{
        const data = await this.paymentRepository.createCheckoutSessionAsync(userStripeId, userId, items, commandIds);
        return data;
    }
}