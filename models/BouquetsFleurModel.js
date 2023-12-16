const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const BFcont = sequelize.define('BFcont', {
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = BFcont;
