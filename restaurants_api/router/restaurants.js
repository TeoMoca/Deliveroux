import express from "express";

export const router = express.Router();

import { db } from "../model/index.js";

router.get("/", async (req, res) => {
  try {
    await db.restaurants.find({}).then((rep) => {
      res.send(rep);
    });
  } catch {
    res.status(404).send({ message: "Error" });
  }
});

router.get("/:restaurant_id", async (req, res) => {
  try {
    await db.restaurants
      .findOne({ _id: req.params.restaurant_id })
      .then((rep) => {
        res.send(rep);
      });
  } catch {
    res.status(404).send({ message: "Error" });
  }
});

router.post("/", (req, res) => {
  console.log(req.body);
  const newRestaurant = {
    name: req.body.name,
    gps: req.body.gps,
    address: req.body.address,
    opening_time: req.body.opening_time,
    closing_time: req.body.closing_time,
    type: req.body.type,
    image_link: req.body.image_link,
    rate: [5],
    components: [],
    display: [],
  };

  db.restaurants.insertMany(newRestaurant).then((rep) => {
    console.log('data inserted')
    res
      .status(200)
      .json({
        message: `restaurant créé`,
        restorantid: rep[0]._id,
      });
  })
});

router.put("/modify", (req, res) => {
  const newRestaurant = {
    _id: req.body._id,
    name: req.body.name,
    gps: req.body.gps,
    address: req.body.address,
    rate: req.body.rate,
    opening_time: req.body.opening_time,
    closing_time: req.body.closing_time,
    type: req.body.type,
    image_link: req.body.image_link,
    components: req.body.components,
    display: req.body.display,
  };
  db.restaurants
    .findOneAndUpdate({ _id: newRestaurant._id }, { $set: newRestaurant })
    .then(() => {
      res.status(200).json({ message: "Objet modifié" });
    })
    .catch((e) => {
      res.status(404).json({ message: `objet non trouvé` });
    });
});

router.delete("/:id", (req, res) => {
  db.restaurants
    .findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Objet Supprimé" });
    })
    .catch((e) => {
      res.status(404).json({ message: `objet non trouvé` });
    });
});
router.put("/", (req, res) => {});
router.get("/test", (req, res) => {
  console.log("je rentre dans la fonction FDP");
  res.status(200).json({ message: "ici FDP" });
});
