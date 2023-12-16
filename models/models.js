
const sequelize = require('../config');
const { DataTypes } = require('sequelize'); // Importez la connexion à la base de données depuis le fichier db.js
const Users = sequelize.define('Users', {
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
  const Fleurs = sequelize.define('Fleurs', {
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

  const Bouquets = sequelize.define('Bouquets', {
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

  // Définition du modèle BFcont
const BFcont = sequelize.define('BFcont', {
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});




  // Définir les associations entre les modèles
  Bouquets.belongsToMany(Fleurs, { through: BFcont });
Fleurs.belongsToMany(Bouquets, { through: BFcont });
 // Bouquets.belongsToMany(Fleurs, { through: { model: BFcont, unique: false }, as: 'bouquet_fleurs', foreignKey: 'idBouquet', otherKey: 'idFleur' });
//  Fleurs.belongsToMany(Bouquets, { through: { model: BFcont, unique: false }, as: 'fleur_bouquets', foreignKey: 'idFleur', otherKey: 'idBouquet' });

Users.belongsToMany(Bouquets, { through: 'UserBouquet', foreignKey: 'idUser' });
Bouquets.belongsToMany(Users, { through: 'UserBouquet', foreignKey: 'idBouquet' });

//Bouquets.belongsToMany(Fleurs, { through: 'BouquetFleur', foreignKey: 'idBouquet'});
//Fleurs.belongsToMany(Users, { through: 'UserBouquet', foreignKey: 'idFleur' });

// Exporter les modèles
module.exports = { Users, Fleurs, Bouquets };

