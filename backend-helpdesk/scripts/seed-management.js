require('dotenv').config();
const mongoose = require('mongoose');
const Agent = require('../models/Agent');
const Team = require('../models/Team');

async function seedManagementData() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/helpdeskdb';
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');

  try {
    // Create teams first
    const teams = [
      { name: 'Support Heroes', description: 'Main support team' },
      { name: 'My New Team', description: 'Secondary support team' },
      { name: 'Technical Team', description: 'Technical specialists' }
    ];

    const createdTeams = [];
    for (const teamData of teams) {
      let team = await Team.findOne({ name: teamData.name });
      if (!team) {
        team = await Team.create(teamData);
        console.log('Created team:', team.name);
      }
      createdTeams.push(team);
    }

    // Create agents
    const agents = [
      {
        name: 'HelpDesk Agent',
        email: 'admin@helpdesk.com',
        password: '1234',
        role: 'Admin',
        team: createdTeams[0]._id
      },
      {
        name: 'John Smith',
        email: 'john@helpdesk.com',
        password: '1234',
        role: 'Agent',
        team: createdTeams[0]._id
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah@helpdesk.com',
        password: '1234',
        role: 'Technician',
        team: createdTeams[1]._id
      },
      {
        name: 'Mike Wilson',
        email: 'mike@helpdesk.com',
        password: '1234',
        role: 'Agent',
        team: createdTeams[2]._id
      }
    ];

    for (const agentData of agents) {
      let agent = await Agent.findOne({ email: agentData.email });
      if (!agent) {
        agent = await Agent.create(agentData);
        console.log('Created agent:', agent.name, 'role:', agent.role);
      }
    }

    console.log('✅ Management data seeded successfully');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedManagementData();
