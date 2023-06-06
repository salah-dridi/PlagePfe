const db = require('../Models');
const Appels = db.Appel;
const GetAllAppels = async (req, res) => {
    try {
        const appels = await db.sequelize.query('SELECT * FROM appel_offres');
        res.json(appels[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
const GetOffresNonLouer = async (req, res) => {
    const id_locataire = null;

    try {
        const appels = await db.sequelize.query(`SELECT * FROM appel_offres WHERE id_locataire IS NULL`);
        res.json(appels[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createOffre = async (req, res) => {
    try {
        const {
            nom_offre,
            prix_offre,
            date_debut_offre,
            date_fin_offre,
        } = req.body;

        const offre = await Appels.create(req.body);
        res.status(201).json({ message: 'offre created successfully!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating offre.' });
    }
};
const GetOffreById = async (req, res) => {
    const id = req.params.id
    try {
        const appels = await db.sequelize.query(`SELECT * FROM appel_offres WHERE id_offre='${id}'`);
        res.json(appels[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
const DeleteOffreById = async (req, res) => {
    const id = req.params.id
    try {
        const appel = await db.sequelize.query(`Delete FROM appel_offres  WHERE id_offre ='${id}'`);
        res.json({ message: 'oui' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
const UpdateOffreById = async (req, res) => {
    const id = req.params.id;
    const nom_offre = req.body.nom_offre;
    const prix_offre = req.body.prix_offre
    const date_debut_offre = req.body.date_debut_offre
    const date_fin_offre = req.body.date_fin_offre
    const id_locataire = req.body.id_locataire
    try {
        const appel = await db.sequelize.query(`UPDATE appel_offres SET nom_offre='${nom_offre}' , prix_offre='${prix_offre}',date_debut_offre='${date_debut_offre}',date_fin_offre='${date_fin_offre}',id_locataire='${id_locataire}' WHERE id_offre = '${id}'`);
        res.json({ message: 'oui' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = {

    GetAllAppels,
    createOffre,
    GetOffreById,
    DeleteOffreById,
    UpdateOffreById,
    GetOffresNonLouer,
};