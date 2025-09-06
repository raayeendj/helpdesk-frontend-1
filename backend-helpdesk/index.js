const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import des routes
const agentRoutes = require('./routes/agentRoutes');
const teamRoutes = require('./routes/teamRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes API
app.use('/api/agents', agentRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/tickets', ticketRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('✅ Backend fonctionne');
});

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/helpdesk')
  .then(() => {
    console.log('✅ Connecté à MongoDB');
  })
  .catch((err) => {
    console.error('❌ Erreur MongoDB :', err);
  });

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé sur le port ${PORT}`);
});
