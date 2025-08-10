import { Router } from "express";
import { Info, validateInfo } from "../models/info.mjs";

const router = Router();

// Get Info settings
router.get("/", async (req, res) => {
  try {
    const settings = await Info.findOne();
    res.json(settings || {});
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Info settings" });
  }
});

// Update or create Info settings
router.put("/", async (req, res) => {
  const { error } = validateInfo(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const settings = await Info.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true, // create if it doesn't exist
    });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Error updating Info settings" });
  }
});

export default router;
