import mongoose from "mongoose";

export default function() {
  const db = process.env.DATABASE_URL;
  mongoose.connect(db)
    .then(() => console.log(`Connected to ${db}...`));
}