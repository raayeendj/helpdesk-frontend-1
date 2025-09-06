// backend/models/Team.js
const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

// virtual pour récupérer les agents d'une équipe
TeamSchema.virtual('agents', {
  ref: 'Agent',
  localField: '_id',
  foreignField: 'team',
});

TeamSchema.set('toJSON', { virtuals: true });
TeamSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Team', TeamSchema);
