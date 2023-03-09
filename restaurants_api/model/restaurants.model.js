import mongoose from "mongoose";

export const restaurants = mongoose.model(
  "restaurants",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    gps: {
      type: [Number, Number],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    rate: {
      type: Array,
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
