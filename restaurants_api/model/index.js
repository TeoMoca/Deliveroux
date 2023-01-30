import mongoose from "mongoose";
import { restaurants } from "./restaurants.model.js";
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.restaurants = restaurants;

export { db };
