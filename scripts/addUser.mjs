import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { User } from "../models/user.mjs";
import { hashPassword } from "../middleware/auth.mjs";

configDotenv();

async function run() {
  const db = process.env.DATABASE_URL;
  if (!db) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }
  await mongoose.connect(db);

  const userData = {
    name: "Test User",
    email: "test2@example.com",
    role: "benevole",
    avatar: "",
  };

  const plainPassword = "123456";
  const hashedPassword = await hashPassword(plainPassword);

  const existing = await User.findOne({ email: userData.email });
  if (existing) {
    console.log("User already exists");
    await mongoose.disconnect();
    return;
  }

  const user = new User({ ...userData, password: hashedPassword });
  await user.save();

  console.log("User added:", user);

  await mongoose.disconnect();
}

run();
