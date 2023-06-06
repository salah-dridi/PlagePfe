const db = require('../Models');
const ParkingPublique = db.ParkingPublique;
// Function to create a new parking publique
const AddParkingPublique = async (req, res) => {
    try {
        const nom_parking_publique = req.body.nom_parking_publique;
        const surface_parking_publique = req.body.surface_parking_publique;
        const parking = await db.ParkingPublique.create({
            nom_parking_publique: nom_parking_publique,
            surface_parking_publique: surface_parking_publique,
        });
        res.status(201).json(parking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Function to find all parkings publiques
const GetAllParkingsPubliques = async (req, res) => {
    try {
        const parkingPublique = await db.sequelize.query(`SELECT * FROM parking_publique`);
        res.json(parkingPublique[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to find a specific parking publique by ID
const GetParkingPubliqueById = async (req, res) => {
    try {
        const parking = await ParkingPublique.findByPk(req.params.id);
        if (parking) {
            const p1 = parking.surface_parking_publique
            const p2 = p1.coordinates;
            const data = {
                nom_parking_publique: parking.nom_parking_publique,
                surface_parking: p2[0]
            };
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: 'Parking not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const GetCentroidParkingPubliqueById = async (req, res) => {
    const id_parking_publique = req.params.id;
    try {
        const parkingPublique = await db.sequelize.query(`SELECT ST_AsGeoJSON(ST_Centroid(surface_parking_publique)) as centroid FROM parking_publique WHERE id_parking_publique = '${id_parking_publique}'`);
        p0 = parkingPublique[0];
        const p1 = p0[0].centroid;
        const p3 = JSON.parse(p1);
        const coordinates = p3.coordinates;
        res.json(coordinates);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to update a specific parking publique by ID
const UpdateParkingPubliqueById = async (req, res) => {
    try {
        const parkingPublique = await ParkingPublique.findByPk(req.params.id);
        if (parkingPublique) {
            await parkingPublique.update(req.body);
            res.status(200).json(parkingPublique);
        } else {
            res.status(404).json({ error: 'Parking publique not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Function to delete a specific parking publique by ID
const DeleteParkingPubliqueById = async (req, res) => {
    try {
        const parkingPublique = await ParkingPublique.findByPk(req.params.id);
        if (parkingPublique) {
            await parkingPublique.destroy();
            res.status(200).json({ message: 'Parking publique deleted successfully' });
        } else {
            res.status(404).json({ error: 'Parking publique not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    AddParkingPublique,
    GetAllParkingsPubliques,
    GetParkingPubliqueById,
    UpdateParkingPubliqueById,
    DeleteParkingPubliqueById,
    GetCentroidParkingPubliqueById
};
