module.exports = (sequelize, DataTypes) => {
    const Parking_publique = sequelize.define('parking_publique', {
        id_parking_publique: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        surface_parking_publique: {
            type: DataTypes.GEOMETRY('POLYGON', 4326),
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_plage: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: 'plage', // Nom de la table cible de la clé étrangère
                key: 'id_plage' // Nom de la colonne cible de la clé étrangère
            }
        }
    }, {
        tableName: 'parking_publique',
        timestamps: false
    });

    Parking_publique.associate = (models) => {
        Parking_publique.belongsTo(models.Plage, {
            foreignKey: 'id_plage'
        });
    };
    return Parking_publique
}