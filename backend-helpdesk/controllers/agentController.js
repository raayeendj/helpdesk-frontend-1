// backend/controllers/agentController.js
const Agent = require('../models/Agent');
const Team = require('../models/Team');

exports.createAgent = async (req, res) => {
  try {
    const { name, email, role, teamId } = req.body;
    if (!name || !email || !teamId) {
      return res.status(400).json({ message: 'name, email et teamId sont requis' });
    }

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: 'Team introuvable' });

    const agent = await Agent.create({ name, email, role, team: teamId });
    const populated = await agent.populate('team', 'name');
    res.status(201).json(populated);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Cet email est déjà utilisé' });
    }
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getAgents = async (req, res) => {
  try {
    const { teamId } = req.query;
    const filter = teamId ? { team: teamId } : {};
    const agents = await Agent.find(filter).populate('team', 'name').sort({ name: 1 });
    res.json(agents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id).populate('team', 'name');
    if (!agent) return res.status(404).json({ message: 'Agent introuvable' });
    res.json(agent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.updateAgent = async (req, res) => {
  try {
    const { name, email, role, teamId, active, avatarUrl } = req.body;
    if (teamId) {
      const team = await Team.findById(teamId);
      if (!team) return res.status(404).json({ message: 'Team introuvable' });
    }
    const updated = await Agent.findByIdAndUpdate(
      req.params.id,
      { name, email, role, team: teamId, active, avatarUrl },
      { new: true, runValidators: true }
    ).populate('team', 'name');
    if (!updated) return res.status(404).json({ message: 'Agent introuvable' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.deleteAgent = async (req, res) => {
  try {
    const deleted = await Agent.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Agent introuvable' });
    res.json({ message: 'Agent supprimé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

