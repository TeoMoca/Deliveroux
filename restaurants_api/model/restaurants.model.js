import mongoose from "mongoose";

export const restaurants = mongoose.model(
  "restaurants",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    gps: {
      type: [String, String],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    opening_time: {
      type: String,
      required: true,
    },
    closing_time: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    image_link: {
      type: String,
      required: true,
    },
    components: {
      type: Array,
      required: true,
    },
    display: {
      type: Array,
      required: true,
    },
  })
);
