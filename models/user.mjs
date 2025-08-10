import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password stored
  role: { type: String, required: true },
  avatar: { type: String, default: "" },
}, { collection: "Users" });

export const User = mongoose.model("User", userSchema);

export function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string(),
    role: Joi.string().required(),
    avatar: Joi.string().allow("", null),
  });
  return schema.validate(user);
}
