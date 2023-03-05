import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { IGetUserByIdUseCase } from "../Core/Interfaces/User/UseCase/IGetUserByIdUseCase";
import {IUpdateRestaurantIdUseCase} from "../Core/Interfaces/User/UseCase/IUpdateRestaurantIdUseCase";
import {IGetAddressByIdUseCase} from "../Core/Interfaces/User/UseCase/IGetAddressByIdUseCase";

export default function UsersRouter(GetUserByIdUseCase: IGetUserByIdUseCase, UpdateRestaurantIdUseCase: IUpdateRestaurantIdUseCase, GetAddressByIdUseCase: IGetAddressByIdUseCase) {
  const router = express.Router();

  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const user = await GetUserByIdUseCase.execute(req.params.id);

      res.send(user);
    } catch (err) {
      res.status(500).send({ message: "Error fetching user by Id" });
    }
  });

    router.patch("/restaurant", async (req: Request, res: Response) => {
    try {
      const user = await UpdateRestaurantIdUseCase.execute(req.body.id, req.body.restaurantId);

      res.send(user);
    } catch (err) {
      res.status (500).send ({message: "Error updating restaurantId"});
      }
    });

    router.get("/address/:id", async (req: Request, res: Response) => {
      try {
        const address = await GetAddressByIdUseCase.execute (req.params.id);

        res.send (address);
      } catch (err) {
        res.status (500).send ({message: "Error fetching address by Id"});
      }
    });


  return router;
}
