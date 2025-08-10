import { Router } from "express";
import { Testimonial, validateTestimonial } from "../models/testimonial.mjs";

const router = Router();

// GET all testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch testimonials" });
  }
});

// GET featured testimonials
router.get("/featured", async (req, res) => {
  try {
    const featuredTestimonials = await Testimonial.find({ featured: true });
    res.json(featuredTestimonials);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch featured testimonials" });
  }
});

// GET testimonials by userId
router.get("/user/:userId", async (req, res) => {
  try {
    const userTestimonials = await Testimonial.find({ userId: req.params.userId });
    res.json(userTestimonials);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user testimonials" });
  }
});

// GET single testimonial by ID
router.get("/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving testimonial" });
  }
});

// POST a new testimonial
router.post("/", async (req, res) => {
  const { error } = validateTestimonial(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const testimonial = new Testimonial(req.body);

  try {
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ message: "Error creating testimonial" });
  }
});

// PUT update testimonial
router.put("/:id", async (req, res) => {
  const { error } = validateTestimonial(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTestimonial) return res.status(404).json({ message: "Testimonial not found" });
    res.json(updatedTestimonial);
  } catch (err) {
    res.status(500).json({ message: "Error updating testimonial" });
  }
});

// DELETE testimonial
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Testimonial not found" });
    res.json({ message: "Testimonial deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting testimonial" });
  }
});

export default router;
