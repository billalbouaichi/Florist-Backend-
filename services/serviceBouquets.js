const Bouquet = require("../models/models");

const Bouquets = require('../models/bouquetsModel');
const Fleurs = require('../models/fleurModel');
const Users = require("../models/userModel");

/*----------------------------------------
* @Desc   Avoir les Bouquets et les fleurs quil contient
* @Methode  GET 
* @Route    /api/v1/bouquets
* @Param    NO-PARAM needed
* @Access PUBLIC
----------------------------------------*/
/*
exports.getAllBouquetsWithFleurs = async (req, res) => {
  try {
    const bouquets = await Bouquets.findAll({
      include: [{ model: Fleurs, as: 'Fleurs' }],
    });

    res.status(200).json({ result: bouquets.length, data: bouquets });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des bouquets avec fleurs.' });
  }
};


/*----------------------------------------
* @Desc   Avoir les Bouquets et les fleurs quil contient & Number of Likes & Info of users who likes it
* @Methode  GET 
* @Route    /api/v1/bouquets
* @Param    NO-PARAM needed
* @Access PUBLIC
----------------------------------------
exports.getAllBouquetsWithFleurs = async (req, res) => {
  try {
    const bouquets = await Bouquets.findAll({
      include: [
        { model: Fleurs, as: 'Fleurs' },
        { model: Users, as: 'Users', through: { attributes: [] } } // Ajoutez cette ligne pour inclure les utilisateurs sans les attributs de liaison
      ],
    });

    // Compter le nombre total de "likes" pour chaque bouquet
    const bouquetsWithLikes = await Promise.all(bouquets.map(async (bouquet) => {
      const likeCount = await bouquet.countUsers();
      return {
        ...bouquet.toJSON(),
        likeCount,
      };
    }));

    res.status(200).json({ result: bouquetsWithLikes.length, data: bouquetsWithLikes });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des bouquets avec fleurs et likes.' });
  }
};

*/
/*----------------------------------------
* @Desc   Avoir les Bouquets et les fleurs quil contient & Number of Likes
* @Methode  GET 
* @Route    /api/v1/bouquets
* @Param    NO-PARAM needed
* @Access PUBLIC
----------------------------------------*/
exports.getAllBouquetsWithFleurs = async (req, res) => {
  try {
    const bouquets = await Bouquets.findAll({
      include: [
        { model: Fleurs, as: 'Fleurs' },
        { model: Users, as: 'Users', through: { attributes: [] } } // Ajoutez cette ligne pour inclure les utilisateurs sans les attributs de liaison
      ],
    });

    // Compter le nombre total de "likes" pour chaque bouquet
    const bouquetsWithLikes = await Promise.all(bouquets.map(async (bouquet) => {
      const likeCount = await bouquet.countUsers();
      return {
        idBouquet: bouquet.idBouquet,
        nom: bouquet.nom,
        descr: bouquet.descr,
        prix: bouquet.prix,
        image: bouquet.image,
        Fleurs: bouquet.Fleurs.map(fleur => ({
          idFleur: fleur.idFleur,
          nom: fleur.nom,
          descr: fleur.descr,
          prix: fleur.prix,
          image: fleur.image,
          BFcont: {
            quantite: fleur.BFcont ? fleur.BFcont.quantite : 0,
          },
        })),
        LikesCount: likeCount, // Utilisez correctement le nom de champ
      };
    }));

    res.status(200).json({ result: bouquetsWithLikes.length, data: bouquetsWithLikes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des bouquets avec fleurs et likes.' });
  }
};
/*********************************************************
* @Desc   Avoir un Bouquets selon son ID
* @Methode  GET 
* @Route    /api/v1/bouquets
* @Param    :id
* @Access PUBLIC
**********************************************************
exports.getBouquetsWithId = async(req,res)=>{
  const bouquetId = req.params.id;
  try {
    const bouquets = await Bouquets.findByPk(bouquetId,{
      include: [{ model: Fleurs, as: 'Fleurs' }, { model: Users, as: 'Users', through: { attributes: [] } } ],
    });

    res.status(200).json({ result: bouquets.length, data: bouquets });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des bouquets avec fleurs.' });
  }
}

*/

/*****************************************************
* @Desc   Avoir un Bouquets selon son ID with fleur et number of likes
* @Methode  GET 
* @Route    /api/v1/bouquets
* @Param    :id
* @Access PUBLIC
******************************************************/
exports.getBouquetsWithId = async (req, res) => {
  try {
    const { id } = req.params; // Récupérer l'ID du paramètre d'URL
    const bouquet = await Bouquets.findOne({
      where: { idBouquet: id },
      include: [
        { model: Fleurs, as: 'Fleurs' },
        { model: Users, as: 'Users', through: { attributes: [] } }
      ],
    });

    if (!bouquet) {
      return res.status(404).json({ error: 'Bouquet non trouvé.' });
    }

    const likeCount = await bouquet.countUsers();
    const bouquetWithLikes = {
      idBouquet: bouquet.idBouquet,
      nom: bouquet.nom,
      descr: bouquet.descr,
      prix: bouquet.prix,
      image: bouquet.image,
      Fleurs: bouquet.Fleurs.map(fleur => ({
        idFleur: fleur.idFleur,
        nom: fleur.nom,
        descr: fleur.descr,
        prix: fleur.prix,
        image: fleur.image,
        BFcont: {
          quantite: fleur.BFcont ? fleur.BFcont.quantite : 0,
        },
      })),
      LikesCount: likeCount,
    };

    res.status(200).json({ data: bouquetWithLikes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération du bouquet avec fleurs et likes.' });
  }
};


