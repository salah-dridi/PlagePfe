const express = require('express');
const locataireController = require('../Controllers/locataireController')
const locataireAuth  = require('../Middlewares/locataireAuth')
const { GetAllLocataires ,AddNewLocatairefaux,GetLocataireById,DeleteLocataireById,UpdateLocataireById,loginLocataire,} = locataireController
const router = express.Router();

router.get('/GetAllLocataires', GetAllLocataires);
router.post('/AddNewLocatairefaux', locataireAuth.saveLocataire, AddNewLocatairefaux);
router.get('/GetLocataireById/:id', GetLocataireById);
router.delete('/DeleteLocataireById/:id', DeleteLocataireById);
router.put('/UpdateLocataireById/:id', UpdateLocataireById);
//login route
router.post('/loginlocataire', loginLocataire);

module.exports = router;