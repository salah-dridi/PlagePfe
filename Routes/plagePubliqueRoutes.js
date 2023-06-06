const express = require('express');
const plagePubliqueController = require('../Controllers/plagePubliqueController')
const { AddPlagePublique,GetAllPlagesPubliques,GetPlagePubliqueById ,GetCentroidPlagePubliqueById} = plagePubliqueController;
const router = express.Router();
const upload = require('../Middlewares/upload')
router.post('/AddNewPlagePublique',upload.single("photo"), AddPlagePublique);
 router.get('/GetAllPlagesPubliques', GetAllPlagesPubliques);
 router.get('/GetPlagePubliqueById/:id', GetPlagePubliqueById );
 router.get('/GetCentroidPlagePubliqueById/:id',GetCentroidPlagePubliqueById);
module.exports = router;