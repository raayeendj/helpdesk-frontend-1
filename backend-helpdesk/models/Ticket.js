const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  requesterName: String,
  requesterEmail: String,
  subject: String,
  message: String,
  status: {
    type: String,
    enum: ['Open', 'Pending', 'On Hold', 'In Progress', 'Closed'],
    default: 'Open'
  },
  priority: {
    type: String,
    enum: ['Low', 'Normal', 'High', 'Critical'],
    default: 'Normal'
  },
  assignee: String,
  team: String,
  tags: String,
  statusHistory: [{
    status: String,
    changedBy: String,
    changedAt: { type: Date, default: Date.now },
    comment: String
  }]
}, {
  timestamps: true
});

// Middleware pour enregistrer l'historique des changements de statut
ticketSchema.pre('save', function(next) {
  if (this.isModified('status') && !this.isNew) {
    this.statusHistory.push({
      status: this.status,
      changedBy: this.assignee || 'System',
      changedAt: new Date(),
      comment: `Status changed to ${this.status}`
    });
  }
  next();
});

module.exports = mongoose.model('Ticket', ticketSchema);
