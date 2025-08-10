import mongoose from "mongoose";
import Joi from "joi";

const infoSchema = new mongoose.Schema({
  website: { type: String, default: "" },
  phone: { type: String, default: "" },
  email: { type: String, default: "" },
  address: { type: String, default: "" },
  siret: { type: String, default: "" },
  social: {
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    snap: { type: String, default: "" },
    tiktok: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    linktr: { type: String, default: "" },
    donation: { type: String, default: "" },
  }
}, { collection: "Infos" });

export const Info = mongoose.model("info", infoSchema);

export function validateInfo(info) {
  const schema = Joi.object({
    website: Joi.string().uri().allow(""),
    phone: Joi.string().allow(""),
    email: Joi.string().email().allow(""),
    address: Joi.string().allow(""),
    siret: Joi.string().allow(""),
    social: Joi.object({
      facebook: Joi.string().uri().allow(""),
      instagram: Joi.string().uri().allow(""),
      snap: Joi.string().uri().allow(""),
      tiktok: Joi.string().uri().allow(""),
      linkedin: Joi.string().uri().allow(""),
      linktr: Joi.string().uri().allow(""),
      donation: Joi.string().uri().allow(""),
    }),
  });

  return schema.validate(info);
}
