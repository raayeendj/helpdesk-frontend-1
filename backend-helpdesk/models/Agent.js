// backend/models/Agent.js
const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: { type: String, enum: ['Admin', 'Technician', 'Agent'], default: 'Agent' },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    active: { type: Boolean, default: true },
    avatarUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Agent', AgentSchema);
