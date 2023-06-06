const express = require('express');
const plageController = require('../Controllers/plageController');
const { AddNewPlage,GetAllPlages,GetPlageById, UpdatePlageById, DeletePlageById } = plageController;
const router = express.Router();
const upload =require('../Middlewares/upload')
// Route to create a new Plage
router.post('/AddNewPlage', upload.single("photo"),AddNewPlage);

// Route to get all Plages
router.get('/GetAllPlages', GetAllPlages);

// Route to get a specific Plage by ID
router.get('/GetPlageById/:id', GetPlageById);

// Route to update a specific Plage by ID
router.put('/UpdatePlageById/:id', UpdatePlageById);

// Route to delete a specific Plage by ID
router.delete('/DeletePlageById/:id', DeletePlageById);

module.exports = router;