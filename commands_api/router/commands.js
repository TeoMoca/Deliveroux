import  express  from "express";
import mongoose from "mongoose";
import { db } from "../models/index.js";


export const commandsRouter = express.Router();


//routes
commandsRouter.get("/service/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
  });
  
commandsRouter.get("/:id_user", (req, res) => {
    var id_user = req.params.id_user;
    console.log(id_user);
    db.commands
      .find({ customerId: id_user })
      .then((e) => {
        res.status(200).json(e);
      })
      .catch(() => {
        res.status(404).json({ message: "no command found" });
      });
  });

  commandsRouter.get("/delivery/todeliver", (req, res) => {
    db.commands
      .find({isAcceptedByRestaurateur:true, isInDelivery:false, isFinished:false })
      .then((e) => {
        res.status(200).json(e);
      })
      .catch(() => {
        res.status(404).json({ message: "no command found" });
      });
  });
  commandsRouter.get("/delivery/delivering", (req, res) => {
    db.commands
      .find({isAcceptedByRestaurateur:true, isInDelivery:true, isFinished:false })
      .then((e) => {
        res.status(200).json(e);
      })
      .catch(() => {
        res.status(404).json({ message: "no command found" });
      });
  });

  commandsRouter.get("/restaurant/:id_restaurant", (req, res) => {
    var id_restaurant = req.params.id_restaurant;
    console.log(id_restaurant);
    db.commands
      .find({ restorantId: id_restaurant })
      .then((e) => {
        res.status(200).json(e);
      })
      .catch(() => {
        res.status(404).json({ message: "no command found" });
      });
  });

  commandsRouter.get("/restaurant/toaccept/:id_restaurant", (req, res) => {
    var id_restaurant = req.params.id_restaurant;
    console.log(id_restaurant);
    db.commands
      .find({ restorantId: id_restaurant, isAcceptedByRestaurateur:false })
      .then((e) => {
        res.status(200).json(e);
      })
      .catch(() => {
        res.status(404).json({ message: "no command found" });
      });
  });
  commandsRouter.get("/restaurant/todeliver/:id_restaurant", (req, res) => {
    var id_restaurant = req.params.id_restaurant;
    console.log(id_restaurant);
    db.commands
      .find({ restorantId: id_restaurant,isAcceptedByRestaurateur:true, isInDelivery:false, isFinished:false })
      .then((e) => {
        res.status(200).json(e);
      })
      .catch(() => {
        res.status(404).json({ message: "no command found" });
      });
  });
  
commandsRouter.patch("/accept/:commandid", async (req, res) => {
    console.log(req.params);
    await db.commands.findByIdAndUpdate(
      { _id: req.params.commandid },
      { isAcceptedByRestaurateur: true }
    );
    res.status(200).send();
  });
  
commandsRouter.patch("/takedelivery/:commandid", async (req, res) => {
    console.log(req.params);
    await db.commands.findOneAndUpdate(
      { _id: req.params.commandid },
      { isInDelivery: true }
    );
  
    res.status(204).send();
  });

  commandsRouter.patch("/finish/:commandid", async (req, res) => {
    console.log(req.params);
    await db.commands.findOneAndUpdate(
      { _id: req.params.commandid },
      { isFinished: true }
    );
  
    res.status(204).send();
  });

  commandsRouter.patch("/pay/:commandid", async (req, res) => {
     try{
         console.log(req.params);
         await db.commands.findOneAndUpdate(
            { _id: req.params.commandid },
            { isPaid: true }
          );

         res.status(204).send();
     }
     catch (e) {
        console.log(e);
        res.status(404).json({ message: `error when update the paid status`, e});
      }
  });


commandsRouter.post("/send", (req, res) => {
    console.table(req.body);
  
    var newCommand = {
      customerId: req.body.customerId,
      restorantId: req.body.restorantId,
      date: req.body.date,
      articles: req.body.articles,
      price: req.body.price,
      adress: req.body.adress,
      city: req.body.city,
      codePostal: req.body.codePostal,
      isPaid: false,
      isAcceptedByRestaurateur: false,
      isInDelivery: false,
      isFinished: false
    };
  
    //sensors.push(newSensor);
    console.log(newCommand.articles);
    db.commands
      .insertMany(newCommand)
      .then((rep) => {
        res
          .status(200)
          .json({
            message: `la command a bien été passée`,
            commandid: rep[0]._id,
          });
      })
      .catch((e) => {
        console.log(e);
        res.status(404).json({ message: `problème` });
      })
      .catch(() => {
        res.status(404).json({ message: "no command found" });
      });
});

commandsRouter.delete("/delete/:commandid", async (req, res) => {
  console.log(req.params);
  await db.commands.findOneAndDelete(
    { _id: req.params.commandid }
  );

  res.status(204).send();
});