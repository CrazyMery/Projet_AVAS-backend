import { Router } from "express";
import { Team, validateTeam } from "../models/team.mjs";

const router = Router();

// Get all teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch teams" });
  }
});

// Get a single team by ID
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving team" });
  }
});

// Create a new team member
router.post("/", async (req, res) => {
  const { error } = validateTeam(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const team = new Team({
    name: req.body.name,
    position: req.body.position,
    description: req.body.description,
    avatar: req.body.avatar,
    startDate: req.body.startDate,
  });

  try {
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ message: "Error creating team member" });
  }
});

// Update a team member by ID
router.put("/:id", async (req, res) => {
  const { error } = validateTeam(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const updateData = {
    name: req.body.name,
    position: req.body.position,
    description: req.body.description,
    avatar: req.body.avatar,
    startDate: req.body.startDate,
    isPrimary: req.body.isPrimary,
  };

  try {
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedTeam) return res.status(404).json({ message: "Team member not found" });
    res.json(updatedTeam);
  } catch (err) {
    res.status(500).json({ message: "Error updating team member" });
  }
});

// Delete a team member by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) return res.status(404).json({ message: "Team member not found" });
    res.json({ message: "Team member deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting team member" });
  }
});

export default router;
