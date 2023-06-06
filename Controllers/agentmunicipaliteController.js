const db = require('../Models');
const AgentMunicipalite = db.AgentMunicipalite;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const saltRounds = 10;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const createAgent = async (req, res) => {
  try {
    const {
      nom_municipalite,
      prenom_municipalite,
      email_municipalite,
      password_municipalite,
      telephone_municipalite,
      fonction_municipalite,
      privilege_municipalite,
      matricule_municipalite,
      adresse_municipalite,
      etat_municipalite,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password_municipalite, saltRounds);
    const agent = await AgentMunicipalite.create(req.body);

    const changePasswordLink = `http://localhost:3000/agent/Invitation/${email_municipalite}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email_municipalite,
      subject: 'Verify Your Email',
      subject: 'طلب إنضمام',
      html: `
          <h1>طلب إنضمام</h1>
          <p>تعتزم بلدية غار الملح بدعوتك للانظمام الى متصفح الواب الفلاني كعون بلدي برتبة   </p>
          <p>${fonction_municipalite}</p>
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
const createAgentfaux = async (req, res) => {
  try {
    const {nom_municipalite,prenom_municipalite,email_municipalite,password_municipalite,telephone_municipalite,fonction_municipalite,privilege_municipalite,matricule_municipalite,adresse_municipalite}= req.body
    const data = {
      nom_municipalite,
      prenom_municipalite,
      email_municipalite,
      password_municipalite: await bcrypt.hash(password_municipalite, 10),
      telephone_municipalite,
      fonction_municipalite,
      privilege_municipalite,
      matricule_municipalite,
      adresse_municipalite,
      etat_municipalite: true
    }
    const agent = await AgentMunicipalite.create(data);
        // If agent details are captured
    // Generate a token with the agent municipale id and the secretKey in the env file
    // Set cookie with the token generated
    if (agent) {
      let token = jwt.sign({ id: agent.id_municipalite }, process.env.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log('agent', JSON.stringify(agent, null, 2));
      console.log(token);
      // Send agent municipalite details
    return res.status(201).json(agent);
    } else {
      return res.status(409).send('Details are not correct');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error creating user.' });
  }
};


const getAgentById = async (req, res) => {
  try {
    const agent = await AgentMunicipalite.findByPk(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAgentById = async (req, res) => {
  try {
    const [rowsUpdated, [updatedAgent]] = await AgentMunicipalite.update(req.body, {
      where: { id_municipalite: req.params.id },
      returning: true,
    });
    if (rowsUpdated !== 1) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json(updatedAgent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const DeleteNewAgentByEmail = async (req, res) => {
  const email_municipalite = req.params.email;
  try {
    const agents = await db.sequelize.query(`Delete FROM  agent_municipalite   WHERE email_municipalite='${email_municipalite}'`);
    res.json({ message: 'oui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const updateNewAgentByEmail = async (req, res) => {
  const email_municipalite = req.params.email;
  const etat_municipalite = true;
  try {
    const agents = await db.sequelize.query(`UPDATE agent_municipalite SET etat_municipalite='${etat_municipalite}' WHERE email_municipalite='${email_municipalite}'`);
    res.json({ message: 'oui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteAgentById = async (req, res) => {
  try {
    const rowsDeleted = await AgentMunicipalite.destroy({
      where: { id_municipalite: req.params.id },
    });
    if (rowsDeleted !== 1) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllAgents = async (req, res) => {
  try {
    const agents = await db.sequelize.query(`SELECT * FROM agent_municipalite WHERE privilege_municipalite  <> '1' AND etat_municipalite='true'`);
    res.json(agents[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const Invitation = async (req, res) => {
  try {
    const email_municipalite = req.params.email;
    res.send(`
      <form action="/agent/UpdateNewAgentByEmail/${email_municipalite}" method="GET">
        <button type="submit">Accepter</button>
      </form>
      <form action="/agent/DeleteNewAgentByEmail/${email_municipalite}" method="GET">
        <button type="submit">Rejeter</button>
      </form>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Login agent municipalite authentication 
  const loginmunicipalite = async (req, res) => {
      try {
        const { email_municipalite, password_municipalite } = req.body;
        // Find an agent_municipalite by their email
        const agentMunicipalite = await AgentMunicipalite.findOne({
          where: {
            email_municipalite: email_municipalite,
          },
        });

        // If agent_municipalite email is found, compare password with bcrypt
        if (agentMunicipalite) {
          const isSame = await bcrypt.compare(password_municipalite, agentMunicipalite.password_municipalite);

          // If password is the same
          // Generate token with the agent_municipalite's id and the secretKey in the env file
          if (isSame) {
            let token = jwt.sign({ id: agentMunicipalite.id_municipalite }, process.env.secretKey, {
              expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            // If password matches with the one in the database
            // Generate a cookie for the agent_municipalite
            res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log('agent_municipalite', JSON.stringify(agentMunicipalite, null, 2));
            console.log(token);
            // Send agent_municipalite data
            return res.status(201).send(agentMunicipalite);
          } else {
            return res.status(401).send('Password authentication failed');
          }
        } else {
          return res.status(401).send('Agent municipalite authentication failed');
        }
      } catch (error) {
        console.log(error);
      }
  };


module.exports = {
  createAgent,
  getAgentById,
  getAllAgents,
  updateAgentById,
  updateNewAgentByEmail,
  deleteAgentById,
  Invitation,
  DeleteNewAgentByEmail,
  createAgentfaux,
  loginmunicipalite,
};