import express from "express";
import { ICreateCheckoutSessionUseCase } from "../Core/Interfaces/Payment/UseCase/Payment/ICreateCheckoutSessionUseCase";
import { Request, Response } from "express";
export default function PaymentRouter(
  CreateCheckoutSessionUseCase: ICreateCheckoutSessionUseCase
) {
  const router = express.Router();

  router.post("/createPayment", async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const data = await CreateCheckoutSessionUseCase.executeAsync(
        req.body.userStripeId,
        req.body.userId,
        req.body.items,
        req.body.commandsIds
      );
      res.send(data);
    } catch (err) {
      res.status(500).send({ message: "Error making payment" });
    }
  });
  return router;
}
