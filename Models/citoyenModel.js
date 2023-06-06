//Citoyen model
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  const Citoyen = sequelize.define('citoyen', {
    id_citoyen: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuidv4(), // Utilisation de uuidv4() pour générer l'ID
      allowNull: false
    },
    email_citoyen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password_citoyen: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'citoyen',
    timestamps: false,
  });
  return Citoyen
}