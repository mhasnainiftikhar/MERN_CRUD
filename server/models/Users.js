const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
}, { collection: "users" });

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
