// backend/scripts/seed-teams.js
require('dotenv').config();
const mongoose = require('mongoose');
const Team = require('./models/Team');
const Agent = require('../models/Agent');

const MONGO_URI = process.env.MONGO_URI;

const teamList = ['Support Technique', 'Maintenance', 'IT', 'Service Client'];
const teamAgents = {
  'Support Technique': ['Amine', 'Yasmine'],
  'Maintenance': ['Sofiane', 'Amina'],
  'IT': ['Rami', 'Lina'],
  'Service Client': ['Sarah', 'Nabil'],
};

function toEmail(name) {
  return name.toLowerCase().replace(/\s+/g, '.') + '@example.com';
}

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connecté MongoDB');

  // ATTENTION: si tu veux garder des données existantes, commente ces deux lignes
  await Agent.deleteMany({});
  await Team.deleteMany({});

  // Créer les teams
  const createdTeams = {};
  for (const name of teamList) {
    const t = await Team.create({ name });
    createdTeams[name] = t;
  }
  console.log('✅ Teams créés');

  // Créer les agents
  for (const [teamName, agents] of Object.entries(teamAgents)) {
    const team = createdTeams[teamName];
    for (const a of agents) {
      await Agent.create({
        name: a,
        email: toEmail(a),
        role: 'Agent',
        team: team._id,
      });
    }
  }
  console.log('✅ Agents créés');

  await mongoose.disconnect();
  console.log('🏁 Seed terminé');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
