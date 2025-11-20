// routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Créer un ticket
router.post('/', ticketController.createTicket);

// Récupérer tous les tickets
router.get('/', ticketController.getAllTickets);

// Récupérer un ticket par ID
router.get('/:id', ticketController.getTicketById);

// Mettre à jour un ticket
router.put('/:id', ticketController.updateTicket);

// Supprimer un ticket
router.delete('/:id', ticketController.deleteTicket);

// Mettre à jour le statut d'un ticket
router.patch('/:id/status', ticketController.updateTicketStatus);

// Récupérer les tickets par statut
router.get('/status/:status', ticketController.getTicketsByStatus);

// Récupérer les statistiques des tickets
router.get('/stats/summary', ticketController.getTicketStats);

module.exports = router;
