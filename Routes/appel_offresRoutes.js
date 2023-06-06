const express = require('express');
const appelController = require('../Controllers/appel_offresController')
const { GetAllAppels, createOffre, DeleteOffreById, UpdateOffreById, GetOffreById, GetOffresNonLouer } = appelController
const router = express.Router();
router.get('/GetAllOffres', GetAllAppels);
router.get('/GetOffresNonLouer', GetOffresNonLouer);
router.get('/GetOffreById/:id', GetOffreById);
router.post('/AddNewOffre', createOffre);
router.delete('/DeleteOffreById/:id', DeleteOffreById)
router.put('/UpdateOffreById/:id', UpdateOffreById)
module.exports = router;