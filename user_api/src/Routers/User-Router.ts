import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { IGetUserByIdUseCase } from "../Core/Interfaces/User/UseCase/IGetUserByIdUseCase";

export default function UsersRouter(GetUserByIdUseCase: IGetUserByIdUseCase) {
  const router = express.Router();

  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const user = await GetUserByIdUseCase.execute(req.params.id);

      res.send(user);
    } catch (err) {
      res.status(500).send({ message: "Error fetching user by Id" });
    }
  });

  return router;
}
