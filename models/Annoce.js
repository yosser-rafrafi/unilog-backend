const mongoose = require("mongoose");

const AnnoceSchema = new mongoose.Schema(
  {
    location: { type: String, required: false },
    numberOfRooms: { type: Number, required: false },
    rent: { type: Number, required: false },
    description: { type: String, required: false },
    photos: [{ type: String, required: false }],
    availability: { type: Boolean, required: false },
  },
  { timestamps: true }
);
const Annonce = mongoose.model("Annonce", AnnoceSchema);
module.exports = Annonce;
