const express = require('express');
const agentmunicipaliteController = require('../Controllers/agentmunicipaliteController');
const saveAgent = require('../Middlewares/agentmAuth')
const { createAgent, getAgentById, updateAgentById, deleteAgentById, updateNewAgentByEmail, getAllAgents, Invitation, DeleteNewAgentByEmail, createAgentfaux, loginmunicipalite } = agentmunicipaliteController;
const router = express.Router();


router.post('/AddNewAgent', saveAgent, createAgent);

router.post('/AddNewAgentfaux', createAgentfaux);
//login municipalite route
router.post('/loginmunicipalite', loginmunicipalite);

router.get('/Invitation/:email', Invitation);

router.get('/GetAllAgents', getAllAgents);

router.get('/GetAgentById/:id', getAgentById);

router.put('/UpdateAgentById/:id', updateAgentById);

router.get('/UpdateNewAgentByEmail/:email', updateNewAgentByEmail);

router.delete('/DeleteAgentById/:id', deleteAgentById);

router.get('/DeleteNewAgentByEmail/:email', DeleteNewAgentByEmail);

module.exports = router;