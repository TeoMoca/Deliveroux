import * as dotenv from "dotenv";
import express from "express";
import PaymentRouter from "./Router/PaymentRouter";
import Stripe from "stripe";
import {PaymentRepository} from "./Infrastructure/Repository/PaymentRepository";
import {CreateCheckoutSessionUseCase} from "./Core/UseCase/Payment/CreateCheckoutSessionUseCase";

const stripe = new Stripe("sk_test_51MPCelFMWS9Sj6TdLXFKZx0z8rT4XHs7kBgJEXbVzLp9UprJnziLOPhzLllt9UwtBnYmDK8qaFfrbE1urjGTlJDd0004hy9m2z", {
    apiVersion: "2022-11-15",
});
dotenv.config();

const app = express();

app.use(express.json());

const paymentMiddleware = PaymentRouter(new CreateCheckoutSessionUseCase(new PaymentRepository(stripe)));
app.use("/payments", paymentMiddleware);
app.listen(8080, () => {
    console.log(`Listening on port ${8080}`);
});