require('dotenv').config();
const mongoose = require('mongoose');
const Agent = require('../models/Agent');
const Team = require('../models/Team');
const Ticket = require('../models/Ticket');

async function replaceTeamsWithMitsubishiTeams() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/helpdeskdb';
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');

  try {
    // Supprimer toutes les équipes existantes
    await Team.deleteMany({});
    console.log('✅ Anciennes équipes supprimées');

    // Créer les nouvelles équipes Mitsubishi
    const mitsubishiTeams = [
      { name: 'Support Technique', description: 'Équipe technique spécialisée Mitsubishi' },
      { name: 'Maintenance', description: 'Équipe de maintenance et réparation' },
      { name: 'Service Client', description: 'Service client et relations Mitsubishi' },
      { name: 'IT', description: 'Équipe informatique et systèmes' }
    ];

    const createdTeams = [];
    for (const teamData of mitsubishiTeams) {
      const team = await Team.create(teamData);
      createdTeams.push(team);
      console.log('✅ Équipe créée:', team.name);
    }

    // Supprimer tous les agents existants
    await Agent.deleteMany({});
    console.log('✅ Anciens agents supprimés');

    // Créer les agents correspondant aux assignees des tickets
    const mitsubishiAgents = [
      {
        name: 'Yasmine',
        email: 'yasmine@mitsubishi.tn',
        password: '1234',
        role: 'Technician',
        team: createdTeams.find(t => t.name === 'Support Technique')._id
      },
      {
        name: 'Sofiane',
        email: 'sofiane@mitsubishi.tn',
        password: '1234',
        role: 'Technician',
        team: createdTeams.find(t => t.name === 'Maintenance')._id
      },
      {
        name: 'Sarah',
        email: 'sarah@mitsubishi.tn',
        password: '1234',
        role: 'Agent',
        team: createdTeams.find(t => t.name === 'Service Client')._id
      },
      {
        name: 'Amine',
        email: 'amine@mitsubishi.tn',
        password: '1234',
        role: 'Technician',
        team: createdTeams.find(t => t.name === 'Support Technique')._id
      },
      {
        name: 'Nabil',
        email: 'nabil@mitsubishi.tn',
        password: '1234',
        role: 'Agent',
        team: createdTeams.find(t => t.name === 'Service Client')._id
      },
      {
        name: 'Rami',
        email: 'rami@mitsubishi.tn',
        password: '1234',
        role: 'Technician',
        team: createdTeams.find(t => t.name === 'IT')._id
      },
      {
        name: 'Amina',
        email: 'amina@mitsubishi.tn',
        password: '1234',
        role: 'Agent',
        team: createdTeams.find(t => t.name === 'Maintenance')._id
      },
      {
        name: 'Admin Mitsubishi',
        email: 'admin@mitsubishi.tn',
        password: '1234',
        role: 'Admin',
        team: createdTeams.find(t => t.name === 'Support Technique')._id
      }
    ];

    for (const agentData of mitsubishiAgents) {
      const agent = await Agent.create(agentData);
      console.log('✅ Agent créé:', agent.name, 'role:', agent.role, 'équipe:', agentData.team);
    }

    console.log('✅ Base de données Mitsubishi mise à jour avec succès');
    console.log('📋 Équipes créées:', mitsubishiTeams.map(t => t.name).join(', '));
    console.log('👥 Agents créés:', mitsubishiAgents.length);

  } catch (err) {
    console.error('❌ Erreur lors de la mise à jour:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

replaceTeamsWithMitsubishiTeams();
