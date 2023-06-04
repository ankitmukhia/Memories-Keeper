import mongoose, { Schema } from "mongoose";

const user = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String},
});

const userSchema = mongoose.model("User", user);

export default userSchema;
