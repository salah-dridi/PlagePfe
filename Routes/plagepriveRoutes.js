const express = require('express');
const plagepriveController = require('../Controllers/plage_priveController');
const { AddNewPlagePrive, GetPlagePriveById } = plagepriveController;
const router = express.Router();
const upload = require('../Middlewares/upload')
// Route to create a new Plage
router.post('/AddNewPlagePrive', upload.single("photo"), AddNewPlagePrive);
router.get('/GetPlagePriveById/:id', GetPlagePriveById);
module.exports = router;