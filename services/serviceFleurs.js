
const Bouquets = require('../models/bouquetsModel');
const Fleurs = require('../models/fleurModel');
const Users = require("../models/userModel");



exports.getAllFlowers = async (req,res) => {
    try {
      const fleurs = await Fleurs.findAll();
      res.status(200).json({ result: fleurs.length, data: fleurs });
    } catch (error) {
      console.error(error);
      throw new Error('Erreur lors de la récupération des fleurs');
    }
  };

  exports.getFlowerWithId = async (req,res) => {
    try {
        const id = req.params.id
      const fleurs = await Fleurs.findByPk(id);
      res.status(200).json({ result: fleurs.length, data: fleurs });
    } catch (error) {
      console.error(error);
      throw new Error('Erreur lors de la récupération des fleurs');
    }
  };


