const mongoose = require("mongoose");

const AnnoceSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    numberOfRooms: { type: Number, required: true },
    rent: { type: Number, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    photos: { type: String, required: true },
    availability: { type: Boolean, required: true },
  },
  { timestamps: true }
);
const Annonce = mongoose.model("Annoce", AnnoceSchema);
module.exports = Annonce;
