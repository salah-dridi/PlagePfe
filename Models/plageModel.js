const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const Plage = sequelize.define('plage', {
        id_plage: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => uuidv4(), // Utilisation de uuidv4() pour générer l'ID
            allowNull: false
        },
        nom_plage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description_plage: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surface_plage: {
            type: DataTypes.GEOMETRY('POLYGON', 4326),
            allowNull: true
        }
    }, {
        tableName: 'plage',
        timestamps: false
    });
    return Plage;
};
