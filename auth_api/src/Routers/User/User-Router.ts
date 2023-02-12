import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { Address } from '../../Domain/Address/Address';
import { User} from "../../Domain/User/User";
import { IRegisterUserUseCase } from "../../Core/Interface/Connexion/UseCase/IRegisterUseCase";
import { ILoginUserUseCase } from "../../Core/Interface/Connexion/UseCase/ILoginUserUseCase";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

export default function UsersRouter(
    RegisterUseCase: IRegisterUserUseCase,
    LoginUseCase: ILoginUserUseCase
){
    const router = express.Router();

   const checkTokenMiddleware = (req:Request, res:Response, next:NextFunction)=> {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token){
      throw new Error();
    }   

    try{

      const decoded = jwt.verify(token, process.env.TOKEN_KEY as string);
      next();

    } catch (error) {
      return res.status(401).send({ message: 'Invalid token.' });
  }
   }
    router.post("/register", async (req:Request, res:Response) => {
        try{
            console.log(req.body.adress);
            const address = new Address(randomUUID(), req.body.adress.adress, req.body.adress.codePostal, req.body.adress.city, req.body.adress.country);
            console.log(address)
            
            const user = new User(
                "",
            req.body.user.IdRole,
            address.id,
            req.body.user.firstname,
            req.body.user.lastname,
            req.body.user.phone,
            req.body.user.mail,
            req.body.user.password, false);

            
            const userCreated = await RegisterUseCase.execute(user, address);

            res.send(userCreated);
        }catch (err) {
            res.status(500).send({ message: "Error adding data" });
          }
    });

    router.post("/login", async (req: Request, res: Response) => {
        const { mail, password } = req.body;
    
        const data = await LoginUseCase.execute(mail, password);
    
        if (data != undefined) {
          const token = jwt.sign(
            { user_id: data.id, mail, role:data.roleId },
            process.env.TOKEN_KEY as string,
            { expiresIn: "2h" }
          );
          const userInfo = { data, message: "User Connected", token: token };
          return res.status(200).json(userInfo);
        }
    
        res.status(400).json({ message: "Wrong email or password" });
      });

      router.get("/check", async(req:Request, res:Response) => {

        const token = req.header('Authorization')?.replace('Bearer ', '');

        if(!token){
          return res.status(401).send({ message: 'No token provided.' });
        }   

          try{
            const decoded = jwt.verify(token, process.env.TOKEN_KEY as string);
            res.send();
            
          } catch (error) {
            return res.status(401).send({ message: 'Invalid token.' });
          }
      });

    return router;
}