const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Proprietere", "Etudiant"] },
    annoncesPublies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Annonce",
        required: false,
        default: [],
      },
    ],
    demandes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Annonce",
        required: false,
        default: [],
      },
    ],
  },
  { timestamps: true }
);

userSchema.set("toObject", {
  transform(doc, ret) {
    delete ret.password;
    return ret;
  },
});

userSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
