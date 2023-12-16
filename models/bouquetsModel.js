const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const User = require('./userModel');
const BFcont = require('./BouquetsFleurModel');

const Bouquet = sequelize.define('Bouquet', {
  idBouquet: {
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

Bouquet.belongsToMany(User, { through: 'UserBouquet', foreignKey: 'idBouquet' });
User.belongsToMany(Bouquet, { through: 'UserBouquet', foreignKey: 'idUser' });

module.exports = Bouquet;
