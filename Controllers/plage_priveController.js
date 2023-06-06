const db = require('../Models');
const Plage = db.PlagePrive
// Function to create a new plage
const AddNewPlagePrive = async (req, res) => {
    try {
        const nom_plage_prive = req.body.nom_plage
        const description_plage_prive = req.body.description_plage
        const surface_plage_prive = req.body.surface_plage_prive;
        const id_locataire =req.body.id_locataire
        const id_plage=req.body.id_plage
        const  photo= req.file.filename
        const plage = await db.PlagePrive.create({
            nom_plage_prive: nom_plage_prive,
            description_plage_prive: description_plage_prive,
            surface_plage_prive: surface_plage_prive,
            id_locataire :id_locataire,
            id_plage :id_plage,
            photo :photo
        });
        res.status(201).json(plage);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Function to find all plages publiques
const GetAllPlagesPrives = async (req, res) => {
    try {
        const plagePrive = await db.sequelize.query(`SELECT * FROM plage_prive`);
        res.json(plagePrive[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to find a specific plage publique by ID
const GetPlagePriveById = async (req, res) => {
    const id_plage_prive = req.params.id
    try {
        const plagePrive= await db.sequelize.query(` SELECT ST_AsGeoJSON(surface_plage_prive) as geojson FROM plage_prive WHERE id_plage_prive = '${id_plage_prive}'`);
        const p1 = plagePrive[0]
        const p2 = p1[0].geojson
        const p3 = JSON.parse(p2)
        res.json(p3.coordinates[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
const GetCentroidPlagePriveById = async (req, res) => {
    const id_plage_prive = req.params.id
    try {
        const plagePublique = await db.sequelize.query(` SELECT ST_AsGeoJSON(ST_Centroid(surface_plage_publique)) as centroid FROM plage_prive WHERE id_plage_prive = '${id_plage_prive}'`);
        p0 = plagePublique[0]
        const p1 = p0[0].centroid
        const p3 = JSON.parse(p1)
        const coordinates = p3.coordinates;
        res.json(coordinates);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Function to update a specific plage publique by ID
const UpdatePlagePriveById = async (req, res) => {
    try {
        const plagePrive = await Plage.findByPk(req.params.id);
        if (plagePrive) {
            await plagePrive.update(req.body);
            res.status(200).json(plagePrive);
        } else {
            res.status(404).json({ error: 'Plage Prive not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Function to delete a specific plage publique by ID
const DeletePlagePriveById = async (req, res) => {
    try {
        const plagePrive = await Plage.findByPk(req.params.id);
        if (plagePrivee) {
            await plagePrive.destroy();
            res.status(200).json({ message: 'PlagePrive deleted successfully' });
        } else {
            res.status(404).json({ error: 'Plage Prive not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
   AddNewPlagePrive,
   DeletePlagePriveById,
   GetAllPlagesPrives,
   GetCentroidPlagePriveById,
   GetPlagePriveById,
   UpdatePlagePriveById
};