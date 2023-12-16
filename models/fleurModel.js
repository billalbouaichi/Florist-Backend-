const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const BFcont = require('./BouquetsFleurModel');
const Bouquet = require("./bouquetsModel");

const Fleur = sequelize.define('Fleur', {
  idFleur: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  descr: {
    type: DataTypes.STRING,
  },
  prix: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Fleur.belongsToMany(Bouquet, { through: BFcont });
Bouquet.belongsToMany(Fleur, { through: BFcont });

module.exports = Fleur;
