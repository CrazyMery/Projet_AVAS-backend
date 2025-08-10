import mongoose from "mongoose";
import Joi from "joi";

const messageSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  isRead: { type: String, default: false },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true, collection: "Messages" });

export const Message = mongoose.model("Message", messageSchema);

export function validateMessage(message) {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    subject: Joi.string().required(),
    content: Joi.string().required(),
    isRead: Joi.boolean(),
  });
  return schema.validate(message);
}
