const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const AgentMunicipalite = sequelize.define('agent_municipalite', {
    id_municipalite: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuidv4(), // Utilisation de uuidv4() pour générer l'ID
      allowNull: false
    },
    nom_municipalite: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prenom_municipalite: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_municipalite: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password_municipalite: {
      type: DataTypes.STRING,
      allowNull: false
    },
    matricule_municipalite: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telephone_municipalite: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    adresse_municipalite: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    privilege_municipalite: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fonction_municipalite: {
      type: DataTypes.STRING,
      allowNull: false
    }
    ,
    etat_municipalite: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  }, {
    tableName: 'agent_municipalite',
    timestamps: false,
  });
  return AgentMunicipalite;
};
