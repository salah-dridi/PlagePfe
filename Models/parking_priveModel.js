const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const ParkingPrive = sequelize.define('parking_prive', {
        id_parking_prive: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => uuidv4(),
            allowNull: false
        },
        surface_parking_prive: {
            type: DataTypes.GEOMETRY('POLYGON', 4326),
            allowNull: false
        },
         nb_places_disponible: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        id_parking: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'parking',
                key: 'id_parking'
            }
        },
        id_locataire: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'locataire',
                key: 'id_locataire'
            }
        }
    }, {
        tableName: 'parking_prive',
        timestamps: false
    });

    ParkingPrive.associate = (models) => {
        ParkingPrive.belongsTo(models.Parking, {
            foreignKey: 'id_parking'
        });
    };
    ParkingPrive.associate = (models) => {
        ParkingPrive.belongsTo(models.Locataire, {
            foreignKey: 'id_locataire'
        });
    };
    return ParkingPrive;
}
