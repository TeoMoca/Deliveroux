import express from "express";
import { router as restaurantsRouter } from "./router/restaurants.js";
import { db } from "./model/index.js";
const app = express();

app.use(express.json());

db.mongoose
  .connect(`mongodb://mongo:27017/test`)
  .then(() => {
    console.log("connexion sucess");
  })
  .catch((err) => {
    console.log("connexion error", err);
    process.exit();
  });

app.use("/restaurants", restaurantsRouter);

app.listen(8080);
