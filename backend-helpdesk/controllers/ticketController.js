// controllers/ticketController.js
const Ticket = require('../models/Ticket');

// Créer un ticket
exports.createTicket = async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    console.error('Erreur lors de la création du ticket :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtenir tous les tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un ticket par ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket introuvable' });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un ticket
exports.updateTicket = async (req, res) => {
  try {
    const updated = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Ticket introuvable' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un ticket
exports.deleteTicket = async (req, res) => {
  try {
    const deleted = await Ticket.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Ticket introuvable' });
    res.json({ message: 'Ticket supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour le statut d'un ticket
exports.updateTicketStatus = async (req, res) => {
  try {
    const { status, comment, changedBy } = req.body;
    const { id } = req.params;

    if (!['Open', 'Pending', 'On Hold', 'In Progress', 'Closed'].includes(status)) {
      return res.status(400).json({ message: 'Statut invalide' });
    }

    const ticket = await Ticket.findById(id);
    if (!ticket) return res.status(404).json({ message: 'Ticket introuvable' });

    // Ajouter à l'historique
    ticket.statusHistory.push({
      status: status,
      changedBy: changedBy || 'System',
      changedAt: new Date(),
      comment: comment || `Status changed to ${status}`
    });

    ticket.status = status;
    await ticket.save();

    res.json(ticket);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtenir les tickets par statut
exports.getTicketsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const tickets = await Ticket.find({ status: status });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir les statistiques des tickets
exports.getTicketStats = async (req, res) => {
  try {
    const stats = await Ticket.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedStats = {
      total: 0,
      open: 0,
      pending: 0,
      onHold: 0,
      inProgress: 0,
      closed: 0
    };

    stats.forEach(stat => {
      formattedStats.total += stat.count;
      formattedStats[stat._id.toLowerCase().replace(' ', '')] = stat.count;
    });

    res.json(formattedStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};