const express = require('express');
const citoyenController = require('../Controllers/citoyenController');
const { signup, logincitoyen, deleteCitoyen } = citoyenController;
const citoyenAuth = require('../Middlewares/citoyenAuth')

const router = express.Router();


//signup endpoint
//passing the middleware function to the signup
router.post('/signup', citoyenAuth.saveCitoyen, signup);

// Define a route to delete a user
router.delete('/citoyen/:id', deleteCitoyen);

//login route
router.post('/logincitoyen', logincitoyen);


module.exports = router;