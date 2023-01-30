import express from "express";

export const router = express.Router();

import { db } from "../model/index.js";

router.get("/", async (req, res) => {
  try {
    await db.restaurants.find({}).then((rep) => {
      res.send(rep);
    });
  } catch {
    res.status(404).send({ message: "TG restaurants FDP" });
  }
});

router.post("/", (req, res) => {
  console.log(req.body);
  const newRestaurant = {
    name: req.body.name,
    gps: req.body.gps,
    address: req.body.address,
    rate: req.body.rate,
    opening_time: req.body.opening_time,
    closing_time: req.body.closing_time,
    type: req.body.type,
    image_link: req.body.image_link,
    components: [],
    display: [],
  };
  db.restaurants.insertMany(newRestaurant).then((rep) => {
    res.status(200).json({
      message: "le restaurant a bien été créé",
    });
  });
});
router.delete("/", (req, res) => {});
router.put("/", (req, res) => {});
router.get("/test", (req, res) => {
  console.log("je rentre dans la fonction FDP");
  res.status(200).json({ message: "ici FDP" });
});
