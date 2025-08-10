import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { Info } from "../models/info.mjs"; // Adjust path to your Site model

configDotenv();

async function run() {
  const db = process.env.DATABASE_URL;
  if (!db) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }

  await mongoose.connect(db);

  // Your site info data
  const siteData = {
    website: "https://example.com",
    phone: "07 67 68 30 06",
    email: "n.nailiavas@gmail.com",
    address: "9 chemin de la ferme 69120",
    siret: "889 352 753 00012",
    social: {
      facebook: "https://facebook.com/yourpage",
      instagram: "https://instagram.com/yourprofile",
      twitter: "https://twitter.com/yourprofile",
      linktr: "https://linktr.ee/avosambitions?utm_source=...",
    }
  };

  // Check if site info already exists (assuming only one document)
  const existing = await Info.findOne({});
  if (existing) {
    console.log("Site info already exists. Updating...");

    existing.website = siteData.website;
    existing.phone = siteData.phone;
    existing.email = siteData.email;
    existing.address = siteData.address;
    existing.siret = siteData.siret;
    existing.social = siteData.social;

    await existing.save();
    console.log("Site info updated:", existing);
  } else {
    // Create new site info document
    const site = new Info(siteData);
    await site.save();
    console.log("Site info added:", site);
  }

  await mongoose.disconnect();
}

run();
