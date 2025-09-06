const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  requesterName: String,
  requesterEmail: String,
  subject: String,
  message: String,
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'],
    default: 'Open'
  },
  priority: {
    type: String,
    enum: ['Low', 'Normal', 'High'],
    default: 'Normal'
  },
  assignee: String,
  team: String,
  tags: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Ticket', ticketSchema);
