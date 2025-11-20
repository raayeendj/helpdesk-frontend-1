// backend/models/Agent.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AgentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 4 },
    role: { type: String, enum: ['Admin', 'Technician', 'Agent'], default: 'Agent' },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    active: { type: Boolean, default: true },
    avatarUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

// Hash password before save if modified
AgentSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to compare password
AgentSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Agent', AgentSchema);
