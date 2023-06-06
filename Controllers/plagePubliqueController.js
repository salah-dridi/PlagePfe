const db = require('../Models');
const PlagePublique = db.PlagePublique
// Function to create a new plage publique
const AddPlagePublique = async (req, res) => {
    try {
        const nom_plage_publique = req.body.nom_plage_publique
        const surface_plage_publique = req.body.surface_plage_publique;
        const plage = await db.PlagePublique.create({
            nom_plage_publique: nom_plage_publique,
            surface_plage_publique: surface_plage_publique,
        });
        res.status(201).json(plage);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Function to find all plages publiques
const GetAllPlagesPubliques = async (req, res) => {
    try {
        const plagePublique = await db.sequelize.query(`SELECT * FROM plage_publique`);
        res.json(plagePublique[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to find a specific plage publique by ID
const GetPlagePubliqueById = async (req, res) => {
    try {
        const plage = await PlagePublique.findByPk(req.params.id);
        if (plage) {
            const p1 = plage.surface_plage_publique
            const p2 = p1.coordinates
           const data ={
            nom_plage_publique:plage.nom_plage_publique,
            surface_plage :p2[0]
           }
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: 'Plage not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const GetCentroidPlagePubliqueById = async (req, res) => {
    const id_plage_publique = req.params.id
    try {
        const plagePublique = await db.sequelize.query(` SELECT ST_AsGeoJSON(ST_Centroid(surface_plage_publique)) as centroid FROM plage_publique WHERE id_plage_publique = '${id_plage_publique}'`);
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
const UpdatePlagePubliqueById = async (req, res) => {
    try {
        const plagePublique = await PlagePublique.findByPk(req.params.id);
        if (plagePublique) {
            await plagePublique.update(req.body);
            res.status(200).json(plagePublique);
        } else {
            res.status(404).json({ error: 'Plage publique not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Function to delete a specific plage publique by ID
const DeletePlagePubliqueById = async (req, res) => {
    try {
        const plagePublique = await PlagePublique.findByPk(req.params.id);
        if (plagePublique) {
            await plagePublique.destroy();
            res.status(200).json({ message: 'Plage publique deleted successfully' });
        } else {
            res.status(404).json({ error: 'Plage publique not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    AddPlagePublique,
    GetAllPlagesPubliques,
    GetPlagePubliqueById,
    UpdatePlagePubliqueById,
    DeletePlagePubliqueById,
    GetCentroidPlagePubliqueById
};