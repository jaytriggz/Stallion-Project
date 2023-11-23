import mongoose from "mongoose";

var CarSchema = new mongoose.Schema({
  model: String,
  description: String,
  year: Number,
  seats: Number,
  transmission: String,
  fuelType: String,
  mileage: String
});

export default mongoose.model("Car", CarSchema);