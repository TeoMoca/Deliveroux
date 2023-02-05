import  express  from "express";
import mongoose from "mongoose";
import { db } from "../models/index.js";


export const notificationsRouter = express.Router();



//routes
notificationsRouter.get("/service/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
  });

notificationsRouter.get("/", (req, res) => {
    db.notifications
      .find({})
      .then((e) => {
        res.status(200).json(e);
      })
      .catch(() => {
        res.status(404).json({ message: "no notifications found" });
      });
});
  
notificationsRouter.get("/:id_user", (req, res) => {
    var id_user = req.params.id_user;
    console.log(id_user);
    db.notifications
      .find({ id_user: id_user })
      .then((e) => {
        res.status(200).json(e);
      })
      .catch(() => {
        res.status(404).json({ message: "no notifications found" });
      });
});
  
notificationsRouter.put("/seen/:id_user", (req, res) => {
    var id_user = req.params.id_user;
    console.log(id_user);
    db.notifications
      .updateMany({ id_user: id_user }, { $set: { seen: true } })
      .then(() => {
        res.status(200).json("ok");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
notificationsRouter.post("/send", (req, res) => {
    console.log(req.body);
    var newNotif = new Object();
    if ("route" in req.body) {
      var newNotif = {
        id_user: req.body.id_user,
        message: req.body.message,
        date: req.body.date,
        route: req.body.route,
        seen: false,
      };
    } else {
      var newNotif = {
        id_user: req.body.id_user,
        message: req.body.message,
        date: req.body.date,
        seen: false,
      };
    }
  
    db.notifications.find({ id_user: req.body.id_user }).then((item) => {
      if (item.length >= 5) {
        console.log("suppression d'un item");
        db.notifications.deleteOne({ id_user: req.body.id_user }).then(() => {
          console.log("Blog deleted");
        });
      }
    });
    //sensors.push(newSensor);
    db.notifications.insertMany(newNotif);
  
    res.status(200).json({
      message: `la notif a bien été envoyée a l'user: ${newNotif.id_user}`,
    });
    //console.log(items)
  });