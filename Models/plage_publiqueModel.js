module.exports = (sequelize, DataTypes) => {
    const Plage_publique = sequelize.define('plage_publique', {
        id_plage_publique: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        surface_plage_publique: {
            type: DataTypes.GEOMETRY('POLYGON', 4326),
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
        tableName: 'plage_publique',
        timestamps: false
    });

    Plage_publique.associate = (models) => {
        Plage_publique.belongsTo(models.Plage, {
            foreignKey: 'id_plage'
        });
    };
    return Plage_publique
}