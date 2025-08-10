import { Router } from "express";
import { User, validateUser } from "../models/user.mjs";
import { comparePasswords, hashPassword } from "../middleware/auth.mjs";

const router = Router();

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isValid = await comparePasswords(password, user.password);
  if (!isValid) return res.status(401).json({ message: "Invalid password" });

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  });
});

// Get all users (exclude passwords)
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Add a new user
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.status(409).json({ message: "Email already exists" });

  const hashedPassword = await hashPassword(req.body.password);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
    avatar: req.body.avatar,
  });

  try {
    await user.save();
    const { password, ...userWithoutPassword } = user.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
});

// Update user by id
router.put("/:id", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const updateData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      avatar: "",
    };

    if (req.body.password) {
      updateData.password = await hashPassword(req.body.password);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
});

// Validate current password before updating
router.post("/validate-password/:id", async (req, res) => {
  const { password } = req.body;
  const userId = req.params.id;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const isValid = await comparePasswords(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Current password is incorrect" });
  }

  res.status(200).json({ message: "Password is valid" });
});

// Update password route
router.put("/:id/password", async (req, res) => {
  const { password } = req.body;
  
  if (!password) return res.status(400).json({ message: "Password is required" });

  const hashedPassword = await hashPassword(password);

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { password: hashedPassword }, { new: true }).select("-password");
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating password" });
  }
});

// Delete user by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

export default router;
