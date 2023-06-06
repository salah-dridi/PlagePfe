const db = require('../Models');
const ParkingPrive = db.ParkingPrive;
// Function to create a new parking prive
const AddParkingPrive = async (req, res) => {
    try {
        const nom_parking_prive = req.body.nom_parking_prive;
        const surface_parking_prive = req.body.surface_parking_prive;
        const parking = await db.ParkingPrive.create({
            nom_parking_prive: nom_parking_prive,
            surface_parking_prive: surface_parking_prive,
        });
        res.status(201).json(parking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Function to find all parkings prives
const GetAllParkingsPrives = async (req, res) => {
    try {
        const parkingPrive = await db.sequelize.query(`SELECT * FROM parking_prive`);
        res.json(parkingPrive[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to find a specific parking prive by ID
const GetParkingPriveById = async (req, res) => {
    try {
        const parking = await ParkingPrive.findByPk(req.params.id);
        if (parking) {
            const p1 = parking.surface_parking_prive
            const p2 = p1.coordinates;
            const data = {
                nom_parking_prive: parking.nom_parking_prive,
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

const GetCentroidParkingPriveById = async (req, res) => {
    const id_parking_prive = req.params.id;
    try {
        const parkingPrive = await db.sequelize.query(`SELECT ST_AsGeoJSON(ST_Centroid(surface_parking_prive)) as centroid FROM parking_prive WHERE id_parking_prive = '${id_parking_prive}'`);
        p0 = parkingPrive[0];
        const p1 = p0[0].centroid;
        const p3 = JSON.parse(p1);
        const coordinates = p3.coordinates;
        res.json(coordinates);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to update a specific parking prive by ID
const UpdateParkingPriveById = async (req, res) => {
    try {
        const parkingPrive = await ParkingPrive.findByPk(req.params.id);
        if (parkingPrive) {
            await parkingPrive.update(req.body);
            res.status(200).json(parkingPrive);
        } else {
            res.status(404).json({ error: 'Parking prive not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Function to delete a specific parking prive by ID
const DeleteParkingPriveById = async (req, res) => {
    try {
        const parkingPrive = await ParkingPrive.findByPk(req.params.id);
        if (parkingPrive) {
            await parkingPrive.destroy();
            res.status(200).json({ message: 'Parking prive deleted successfully' });
        } else {
            res.status(404).json({ error: 'Parking prive not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    AddParkingPrive,
    GetAllParkingsPrives,
    GetParkingPriveById,
    UpdateParkingPriveById,
    DeleteParkingPriveById,
    GetCentroidParkingPriveById
};
