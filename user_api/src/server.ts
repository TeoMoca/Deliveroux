import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import UsersRouter from "./Routers/User-Router";
import {GetUserByIdUseCase} from "./Core/UseCase/User/GetUserByIdUseCase";
import {UserRepository} from "./Infrastructure/Repository/UserRepository";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
});
dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string, 10);
 
 const app = express();

 app.use(helmet());
app.use(cors());
app.use(express.json());


const userMiddleware = UsersRouter(new GetUserByIdUseCase(new UserRepository(prisma, stripe)));

app.use("/user", userMiddleware);
app.listen(8080, () => {
    console.log(`Listening on port ${8080}`);
  });