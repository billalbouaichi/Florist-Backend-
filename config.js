const Sequelize = require('sequelize');

// Remplacez les valeurs par les informations de votre base de données
const sequelize = new Sequelize('florist', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});


module.exports = sequelize;
