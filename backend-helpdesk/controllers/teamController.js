// backend/controllers/teamController.js
const Team = require('../models/Team');

exports.createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'name est requis' });

    const team = await Team.create({ name, description });
    res.status(201).json(team);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Ce team existe déjà' });
    }
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getTeams = async (_req, res) => {
  try {
    const teams = await Team.find().sort({ name: 1 });
    res.json(teams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getTeamsWithAgents = async (_req, res) => {
  try {
    const teams = await Team.find().populate('agents').sort({ name: 1 });
    res.json(teams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
