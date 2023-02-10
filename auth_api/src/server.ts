import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { RegisterUserUseCase } from "./Core/UseCase/Connexion/RegisterUseCase";
import { LoginUserUseCase } from "./Core/UseCase/Connexion/LoginUserUseCase";
import UsersRouter from "./Routers/User/User-Router";
import { ConnexionRepository } from "./Infrastructure/Repository/ConnexionRepository";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
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


const userMiddleware = UsersRouter(new RegisterUserUseCase(new ConnexionRepository(prisma, stripe)), new LoginUserUseCase(new ConnexionRepository(prisma, stripe)));

app.use("/auth", userMiddleware);
app.listen(8080, () => {
    console.log(`Listening on port ${8080}`);
  });