const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const AppelOffres = sequelize.define('appel_offres', {
        id_offre: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => uuidv4(), // Utilisation de uuidv4() pour générer l'ID
            allowNull: false
        },
        nom_offre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        marque_offre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prix_offre: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        date_debut_offre: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date_fin_offre: {
            type: DataTypes.DATE,
            allowNull: false
        },
        id_locataire: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: 'locataire', // Nom de la table cible de la clé étrangère
                key: 'id_locataire' // Nom de la colonne cible de la clé étrangère
            }
        }
    }, {
        tableName: 'appel_offres',
        timestamps: false
    });

    AppelOffres.associate = (models) => {
        AppelOffres.belongsTo(models.Locataire, {
            foreignKey: 'id_locataire'
        });
    };

    return AppelOffres;
};
