const jwt = require('jsonwebtoken');
const Agent = require('../models/Agent');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    const agent = await Agent.findOne({ email: email.toLowerCase() });
    if (!agent) return res.status(401).json({ message: 'Identifiants invalides' });

    const isMatch = await agent.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Identifiants invalides' });

    const payload = { sub: agent._id.toString(), role: agent.role, email: agent.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '12h' });

    res.json({
      token,
      user: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        role: agent.role,
        team: agent.team,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


