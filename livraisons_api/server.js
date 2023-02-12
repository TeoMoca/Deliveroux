import  express  from "express";
import mongoose from "mongoose";
import { livraisonsRouter } from "./router/livraisons.js";
import { db } from "./models/index.js";
import dotenv from "dotenv"

dotenv.config()
const app = express();
app.use(express.json());
app.use("/livraisons", livraisonsRouter);


//connection
db.mongoose
  .connect(
    `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connexion success");
  })
  .catch((err) => {
    console.log("connexion error");
  });



app.listen(8080, () => {
  console.log("server is running on port 8080.");
});