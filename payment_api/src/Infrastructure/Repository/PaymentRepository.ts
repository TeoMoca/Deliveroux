import {IPaymentRepository} from "../../Core/Interfaces/Payment/Repository/IPaymentRepository";
import { Stripe } from "stripe";
import {CheckoutSession} from "../../Domain/CheckoutSession";
import {Item} from "../../Domain/Item";

export class PaymentRepository implements IPaymentRepository{
    stripeDataSource: Stripe
    constructor( stripeDataSource: Stripe) {
        this.stripeDataSource = stripeDataSource;
    }
    async createCheckoutSessionAsync(userStripeId:string, userId:string, items:Item[], commandIds:string[]) {
        try{
            const command = [];

            for(const item of items){
                const itemCommand = {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: item.price * 100,
                    },
                    quantity: item.quantity,
                };

                command.push(itemCommand);

            };

            const session = await this.stripeDataSource.checkout.sessions.create({
                payment_method_types: ['card'],
                client_reference_id: userStripeId,
                line_items: command,
                mode: 'payment',
                success_url: 'http://localhost:8081/commands/' + userId + '/payment',
                cancel_url: 'http://localhost:3000/cancel',
            });

            const checkoutSession = new CheckoutSession(session.id, session.url, commandIds);

            return checkoutSession;
        }
        catch (err) {
            console.log(err);
        }

    }
}