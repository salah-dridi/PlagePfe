const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const Plage_prive = sequelize.define('plage_prive ', {
        id_plage_prive: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => uuidv4(), // Utilisation de uuidv4() pour générer l'ID
            allowNull: false
        },
        surface_plage_prive: {
            type: DataTypes.GEOMETRY('POLYGON', 4326),
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // prix_parasole: {
        //   type: DataTypes.FLOAT,
        //   allowNull: false
        // },
        // nb_parasole: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false
        // },
        // prix_chaise_long: {
        //   type: DataTypes.FLOAT,
        //   allowNull: false
        // },
        // nb_chaise_long: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false
        // },
        // prix_chaise: {
        //   type: DataTypes.FLOAT,
        //   allowNull: false
        // },
        // nb_chaise: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false
        // },
        // prix_table: {
        //   type: DataTypes.FLOAT,
        //   allowNull: false
        // },
        // nb_table: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false
        // },
        // prix_cabane: {
        //   type: DataTypes.FLOAT,
        //   allowNull: false
        // },
        // nb_cabane: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false
        // },
        // prix_table_petite: {
        //   type: DataTypes.FLOAT,
        //   allowNull: false
        // },
        // nb_table_petite: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false
        // },
        id_plage: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'plage', // Nom de la table cible de la clé étrangère
                key: 'id_plage' // Nom de la colonne cible de la clé étrangère
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
        tableName: 'plage_prive',
        timestamps: false
    });

    Plage_prive.associate = (models) => {
        Plage_prive.belongsTo(models.Plage, {
            foreignKey: 'id_plage'
        });
    };
    Plage_prive.associate = (models) => {
        Plage_prive.belongsTo(models.Locataire, {
            foreignKey: 'id_locataire'
        });
    };
    return Plage_prive
}