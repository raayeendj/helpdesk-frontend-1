require('dotenv').config();
const mongoose = require('mongoose');
const Agent = require('../models/Agent');
const Team = require('../models/Team');

async function run() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/helpdeskdb';
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');

  try {
    // Ensure default team exists
    let team = await Team.findOne({ name: 'Support' });
    if (!team) {
      team = await Team.create({ name: 'Support', description: 'Default support team' });
      console.log('Created team:', team.name);
    }

    const email = process.env.SEED_EMAIL || 'Rayendj@gmail.com';
    const password = process.env.SEED_PASSWORD || '1234';
    const role = process.env.SEED_ROLE || 'Agent';

    let agent = await Agent.findOne({ email: email.toLowerCase() });
    if (agent) {
      console.log('Agent already exists:', agent.email);
    } else {
      agent = new Agent({
        name: 'Rayen',
        email,
        password,
        role,
        team: team._id,
      });
      await agent.save();
      console.log('Created agent:', agent.email, 'role:', agent.role);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

run();


