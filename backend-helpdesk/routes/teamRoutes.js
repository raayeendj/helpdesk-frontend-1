// backend/routes/teamRoutes.js
const express = require('express');
const router = express.Router();
const teamCtrl = require('../controllers/teamController');

router.get('/', teamCtrl.getTeams);
router.get('/with-agents', teamCtrl.getTeamsWithAgents);
router.post('/', teamCtrl.createTeam);

module.exports = router;
