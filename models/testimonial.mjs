import mongoose from "mongoose";
import Joi from "joi";

const testimonialSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  author: { type: String, required: true },
  position: { type: String, required: true },
  featured: { type: Boolean, default: false },
  userId: { type: String },
}, { timestamps: true, collection: "Testimonials" });

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export function validateTestimonial(testimonial) {
  const schema = Joi.object({
    comment: Joi.string().required(),
    author: Joi.string().required(),
    position: Joi.string().required(),
    featured: Joi.boolean().required(),
    userId: Joi.string().optional(),
  });
  return schema.validate(testimonial);
}
