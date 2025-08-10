import mongoose from "mongoose";
import Joi from "joi";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  description: { type: String, default: ""  },
  avatar: { type: String, default: "" },
  startDate: { type: String, default: "" },
  isPrimary: { type: Boolean, default: false },
}, { collection: "Teams" });

export const Team = mongoose.model("Team", teamSchema);

export function validateTeam(team) {
  const schema = Joi.object({
    name: Joi.string().required(),
    position: Joi.string().required(),
    description: Joi.string().allow("", null),
    avatar: Joi.string().allow("", null),
    startDate: Joi.string().allow("", null),
    isPrimary: Joi.boolean().default(false),
  });
  return schema.validate(team);
}
