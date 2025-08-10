import { Router } from "express";
import { Message, validateMessage } from "../models/message.mjs";

const router = Router();

// GET all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

// GET single message by ID
router.get("/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving message" });
  }
});

// POST a new message
router.post("/", async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const message = new Message(req.body);

  try {
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: "Error creating message" });
  }
});

// PUT update message (e.g., changing status)
router.put("/:id", async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMessage) return res.status(404).json({ message: "Message not found" });
    res.json(updatedMessage);
  } catch (err) {
    res.status(500).json({ message: "Error updating message" });
  }
});

// DELETE message
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting message" });
  }
});

export default router;
