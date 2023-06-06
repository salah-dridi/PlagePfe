const bcrypt = require('bcrypt');
const db = require('../Models');
const jwt = require('jsonwebtoken');
const { QueryTypes } = require('sequelize');

// Assigning Citoyen model to the variable Citoyen
const Citoyen = db.citoyen;


// Signing up a citoyen
// Hashing the citoyen's password before saving it to the database with bcrypt
const signup = async (req, res) => {
  try {
    const { email_citoyen, password_citoyen } = req.body;
    const data = {
      email_citoyen,
      password_citoyen: await bcrypt.hash(password_citoyen, 10),
    };
    // Saving the citoyen
    const citoyen = await Citoyen.create(data);

    // If citoyen details are captured
    // Generate a token with the citoyen's id and the secretKey in the env file
    // Set cookie with the token generated
    if (citoyen) {
      let token = jwt.sign({ id: citoyen.id_citoyen }, process.env.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log('citoyen', JSON.stringify(citoyen, null, 2));
      console.log(token);
      // Send citoyen details
      return res.status(201).send(citoyen);
    } else {
      return res.status(409).send('Details are not correct');
    }
  } catch (error) {
    console.log(error);
  }
};

// Login authentication
const logincitoyen = async (req, res) => {
  try {
    const { email_citoyen, password_citoyen } = req.body;
    // Find a citoyen by their email
    const citoyen = await Citoyen.findOne({
      where: {
        email_citoyen: email_citoyen,
      },
    });

    // If citoyen email is found, compare password with bcrypt
    if (citoyen) {
      const isSame = await bcrypt.compare(password_citoyen, citoyen.password_citoyen);

      // If password is the same
      // Generate token with the citoyen's id and the secretKey in the env file
      if (isSame) {
        let token = jwt.sign({ id: citoyen.id_citoyen }, process.env.secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        // If password matches with the one in the database
        // Generate a cookie for the citoyen
        res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log('citoyen', JSON.stringify(citoyen, null, 2));
        console.log(token);
        // Send citoyen data
        return res.status(201).send(citoyen);
      } else {
        return res.status(401).send('password Authentication failed');
      }
    } else {
      return res.status(401).send('Citoyen Authentication failed');
    }
  } catch (error) {
    console.log(error);
  }
};


// Define a controller method to delete a Citoyen
const deleteCitoyen = async (req, res) => {
  const CitoyenID = req.params.id;

  try {
    // Find the Citoyen by ID and delete it
    const result = await db.sequelize.query(`DELETE FROM "citoyen" WHERE "id_citoyen" = '${CitoyenID}'`, { type: QueryTypes.DELETE });

    // If the Citoyen was successfully deleted, return a success response
    if (Citoyen) {
      return res.status(200).json({
        message: 'Citoyen deleted successfully'
      });
    }

    // If the Citoyen was not found, return a 404 response
    return res.status(404).json({
      message: 'Citoyen not found'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Failed to delete Citoyen'
    });
  }
};

module.exports = {
  deleteCitoyen,
  signup,
  logincitoyen,
};