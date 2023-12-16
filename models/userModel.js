const { DataTypes } = require('sequelize');
const bcrypt = require("bcryptjs");
const sequelize = require('../config');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const User = sequelize.define('User', {
  idUser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  PSW: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  nomComplet: {
    type: DataTypes.STRING,
    defaultValue: "USER"
  },
});
User.prototype.generateToken = function () {
    return jwt.sign(
      { id: this.idUser, type: this.type },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      }
    );
  };

  User.beforeCreate(async function (next) {
    if (!this.isModified("password")) return next();
    //hashing user password
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
module.exports = User;
