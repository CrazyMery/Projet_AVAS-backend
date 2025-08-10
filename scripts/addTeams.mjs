import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { Team } from "../models/team.mjs";

configDotenv();

async function run() {
  const db = process.env.DATABASE_URL;
  if (!db) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }

  await mongoose.connect(db);

  // Example array of teams to add
  const teamsData = [
    {
      name: "Abdallah Slimani",
      position: "Président",
      description: "Fondateur et visionnaire d\'AVAS, passionné par le développement local",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      startDate: "",
    },
    {
      name: "Naila Nouri",
      position: "Directrice Générale",
      description: "Coordination des projets et développement stratégique",
      avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      startDate: "",
    },
    {
      name: "Karim Benali",
      position: "Responsable Pôle Jeunesse",
      description: "Animation et accompagnement des jeunes du quartier",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      startDate: "",
    },
    {
      name: "Fatima Ouali",
      position: "Responsable Médiation Urbaine",
      description: "Gestion des conflits et médiation de proximité",
      avatar: "https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      startDate: "",
    },
    {
      name: "Ahmed Khoury",
      position: "Responsable Pôle Citoyenneté",
      description: "Développement de projets collaboratifs citoyens",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      startDate: "",
    },
    {
      name: "Samira Hadj",
      position: "Coordinatrice Administrative",
      description: "Gestion administrative et financière",
      avatar: "https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      startDate: "",
    },
    {
        name: 'Amaris De Pilla',
        position: 'Bénévole Animation',
        description: "",
        avatar: 'https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        startDate: '2022'
      },
      {
        name: 'Bernard Semeur',
        position: 'Bénévole Accompagnement',
        description: "",
        avatar: 'https://images.pexels.com/photos/2379006/pexels-photo-2379006.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
        startDate: '2021'
      },
      {
        name: 'Leila Mansouri',
        position: 'Bénévole Événementiel',
        description: "",
        avatar: 'https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        startDate: '2023'
      },
      {
        name: 'Youssef Alami',
        position: 'Bénévole Communication',
        description: "",
        avatar: 'https://images.pexels.com/photos/2182971/pexels-photo-2182971.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
        startDate: '2022'
      },
      {
        name: 'Nadia Cherif',
        position: 'Bénévole Médiation',
        description: "",
        avatar: 'https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        startDate: '2020'
      },
      {
        name: 'Omar Belkacem',
        position: 'Bénévole Jeunesse',
        description: "",
        avatar: 'https://images.pexels.com/photos/2182971/pexels-photo-2182971.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
        startDate: '2023'
      }  
  ];

  for (const teamData of teamsData) {
    const existing = await Team.findOne({ name: teamData.name, position: teamData.position });
    if (existing) {
      console.log(`Team member "${teamData.name}" already exists. Skipping.`);
      continue;
    }

    const team = new Team(teamData);
    await team.save();
    console.log("Added team member:", team.name);
  }

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
}

run();
