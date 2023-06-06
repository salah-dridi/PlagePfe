const db = require('../Models');
const Locataire = db.Locataire;
const Appel = db.Appel
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { QueryTypes } = require('sequelize');

const saltRounds = 10;
const GetAllLocataires = async (req, res) => {
  try {
    const locataires = await db.sequelize.query('SELECT * FROM locataire');
    res.json(locataires[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Define a controller method to add a Locataire
const AddNewLocatairefaux = async (req, res) => {
  try {
    const { cin_locataire, nom_locataire, prenom_locataire, adresse_locataire, telephone_locataire, email_locataire, password_locataire } = req.body;

    const data = {
      cin_locataire,
      nom_locataire,
      prenom_locataire,
      adresse_locataire,
      telephone_locataire,
      email_locataire,
      password_locataire: await bcrypt.hash(password_locataire, 10),
      etat_locataire: true
    };
    // Saving the locataire
    const locataire = await Locataire.create(data);

    if (locataire) {
      let token = jwt.sign({ id: locataire.id_locataire }, process.env.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });
  // generate token with id and secret key , Set cookie with the token generated
      res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log('locataire', JSON.stringify(locataire, null, 2));
      console.log(token);
      // Send locataire details
      return res.status(201).send(locataire);
    } else {
      return res.status(409).send('Details are not correct');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed to add locataire'
    });
  }
};

const GetLocataireById = async (req, res) => {
  const id_locataire = req.params.id;
  try {
    const locataire = await db.sequelize.query(`SELECT * FROM  locataire  WHERE id_locataire ='${id_locataire}'`);
    res.json(locataire[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Define a controller method to delete a Locataire
const DeleteLocataireById = async (req, res) => {
  const LocataireID = req.params.id;

  try {
    const rowsDeleted = await Locataire.destroy({
      where: { id_locataire: req.params.id },
    });
    if (rowsDeleted !== 1) {
      return res.status(404).json({ message: 'locataire not found' });
    }
    res.status(204).json({ message: "oui" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const AddNewLocataire = async (req, res) => {
  try {
    const {
      nom_locataire,
      prenom_locataire,
      email_locataire,
      password_locataire,
      telephone_locataire,
      cin_locataire,
      etat_locataire,
    } = req.body;
    password_locataire = await bcrypt.hash(password_locataire, saltRounds);
    const locataire = await Locataires.create(req.body);

    const changePasswordLink = `http://localhost:3000/locataire/Invitation/${email_locataire}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email_locataire,
      subject: 'Verify Your Email',
      subject: 'طلب إنضمام',
      html: `
            <h1>طلب إنضمام</h1>
            <p>تعتزم بلدية غار الملح بدعوتك للانظمام الى متصفح الواب الفلاني كمستاجر   </p>
            <p>اضغط هنا للمزيد من المعلومات</p>
            <a href="${changePasswordLink}" ><button>المتابعة</button></a>
          `,

    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating user.' });
  }
};
const DeleteNewLocataireByEmail = async (req, res) => {
  const email_locataire = req.params.email;
  try {
    const locataire = await db.sequelize.query(`Delete FROM  locataire WHERE email_locataire ='${email_locataire}'`);
    res.json({ message: 'oui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateNewLocataireByEmail = async (req, res) => {
  const email_locataire = req.params.email;
  const etat_locataire = true;
  try {
    const locataire = await db.sequelize.query(`UPDATE locataire SET etat_locataire ='${etat_locataire}' WHERE email_locataire ='${email_locataire}'`);
    res.json({ message: 'oui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



const Invitation = async (req, res) => {
  try {
    const email_locataire = req.params.email;
    res.send(`
        <form action="/locataire/UpdateNewLocataireByEmail/${email_locataire}" method="GET">
          <button type="submit">Accepter</button>
        </form>
        <form action="/locataire/DeleteNewLocataireByEmail/${email_locataire}" method="GET">
          <button type="submit">Rejeter</button>
        </form>
      `);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Define a controller method to update a Locataire
const UpdateLocataireById = async (req, res) => {
  const LocataireID = req.params.id;

  try {
    // Find the Locataire by ID
    const locataire = await Locataire.findOne({ where: { id_locataire: LocataireID } });

    if (locataire) {
      // Update the Locataire with the new data
      const { cin_locataire, nom_locataire, prenom_locataire, adresse_locataire, telephone_locataire, email_locataire } = req.body;

      const data = {
        cin_locataire,
        nom_locataire,
        prenom_locataire,
        adresse_locataire,
        telephone_locataire,
        email_locataire,
      };

      await locataire.update(data);

      console.log('locataire', JSON.stringify(locataire, null, 2));
      // Send the updated Locataire details
      return res.status(200).send(locataire);
    }

    // If the Locataire was not found, return a 404 response
    return res.status(404).json({
      message: 'Locataire not found'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Failed to update Locataire'
    });
  }
};

const loginLocataire = async (req, res) => {
  try {
    const { email_locataire, password_locataire } = req.body;

    // Find a locataire by their email
    const locataire = await Locataire.findOne({
      where: {
        email_locataire: email_locataire,
      },
    });

    // If locataire email is found, compare password with bcrypt
    if (locataire) {
      const isSame = await bcrypt.compare(password_locataire, locataire.password_locataire);

      // If password is the same
      // Generate token with the locataire's id and the secretKey in the env file
      if (isSame) {
        const token = jwt.sign({ id: locataire.id_locataire }, process.env.secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        // If password matches with the one in the database
        // Generate a cookie for the locataire
        res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });
        console.log('locataire', JSON.stringify(locataire, null, 2));
        console.log(token);
        // Send locataire data
        return res.status(200).send(locataire);
      } else {
        return res.status(401).send('password Authentication failed');
      }
    } else {
      return res.status(401).send('locataire Authentication failed');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};

module.exports = {
  loginLocataire,
  GetAllLocataires,
  AddNewLocatairefaux,
  GetLocataireById,
  DeleteLocataireById,
  UpdateLocataireById,
}; 