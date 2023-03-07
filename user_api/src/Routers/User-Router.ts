import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { IGetUserByIdUseCase } from "../Core/Interfaces/User/UseCase/IGetUserByIdUseCase";
import {IUpdateRestaurantIdUseCase} from "../Core/Interfaces/User/UseCase/IUpdateRestaurantIdUseCase";
import {IGetAddressByIdUseCase} from "../Core/Interfaces/User/UseCase/IGetAddressByIdUseCase";
import {IUpdateUserProfileAsyncUseCase} from "../Core/Interfaces/User/UseCase/IUpdateUserProfileAsyncUseCase";
import {IDeleteUserAsyncUseCase} from "../Core/Interfaces/User/UseCase/IDeleteUserAsyncUseCase";

export default function UsersRouter(GetUserByIdUseCase: IGetUserByIdUseCase, UpdateRestaurantIdUseCase: IUpdateRestaurantIdUseCase,
                                    GetAddressByIdUseCase: IGetAddressByIdUseCase, UpdateUserProfileAsyncUseCase: IUpdateUserProfileAsyncUseCase,
                                    DeleteUserByIdUseCase: IDeleteUserAsyncUseCase) {
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

    router.patch("/:id", async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const user = await UpdateUserProfileAsyncUseCase.execute(req.params.id, req.body.user, req.body.address);

      res.send(user);
    } catch (err) {
      res.status (500).send ({message: "Error updating user profile"});
      }
    });

    router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const user = await DeleteUserByIdUseCase.execute(req.params.id);

      res.send(user);
    } catch (err) {
      res.status (500).send ({message: "Error deleting user by Id"});
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
