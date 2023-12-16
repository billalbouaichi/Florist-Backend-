
const asyncHandler = require('express-async-handler');
const bcrypt = require("bcrypt");
const User = require('../models/userModel');

// Service de connexion
exports.login = asyncHandler(async (req, res, next) => {
  // Recherche de l'utilisateur par login (ou email, selon votre modèle)
  //const lg  = "user2" ;
  const lg = req.body.login;
  console.log(lg);
  const user = await User.findOne({ where: { login: lg} });

  if (!user) {
    // L'utilisateur n'a pas été trouvé
    res.status(401).json({ error: 'Identifiants incorrects' });
    return;
  }
  const psw  = req.body.PSW
  //const psw = "123abc";
  // Vérification du mot de passe
  const isPasswordCorrect = await bcrypt.compare(psw, user.PSW);

  if (!isPasswordCorrect) {
    // Mot de passe incorrect
    res.status(401).json({ error: 'Identifiants incorrects : Mot de passe Incorrect' });
    return;
  }

  // Génération du jeton JWT
  const token = user.generateToken();

  // Retour de la réponse avec le jeton et les informations de l'utilisateur
  res.status(200).json({
    idUser: user.idUser,
    login: user.login,
    nomComplet: user.nomComplet,
    token,
  });
});
