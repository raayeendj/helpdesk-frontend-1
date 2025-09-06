// backend/routes/agentRoutes.js
const express = require('express');
const router = express.Router();
const agentCtrl = require('../controllers/agentController');

router.get('/', agentCtrl.getAgents);
router.get('/:id', agentCtrl.getAgentById);
router.post('/', agentCtrl.createAgent);
router.put('/:id', agentCtrl.updateAgent);
router.delete('/:id', agentCtrl.deleteAgent);

module.exports = router;
