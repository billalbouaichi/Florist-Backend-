
const Users = require("./models/userModel");
const Fleurs = require("./models/fleurModel");
const Bouquets = require("./models/bouquetsModel");
const bcrypt = require("bcrypt");
const sequelize = require("./config");
const insertData = async () => {
    await sequelize.models.Fleurs.bulkCreate([
      { nom: 'Hortensia', descr:'Description de la fleur ajoutr 1:Hortensia',prix:260.00,image:'http://localhost:3000/image/pivoine.jpg' },
      { nom: 'Calla', descr:'Description de la fleur ajoute 2:Calla',prix:300.00,image:'http://localhost:3000/image/lavande.jpg' },
      { nom: 'Amaryllisv', descr:'Description de la fleur ajouter 3 :Amaryllis',prix:500.00,image:'http://localhost:3000/image/freesia.jpg' },
     
    ]);

    await sequelize.models.Bouquets.bulkCreate([
      { nom: 'Bouquet joie', descr:'étre ta joie c est ce que je voulais ',prix:5000.00,image:'http://localhost:3000/image/Bromantique.jpg' },
      { nom: 'Bouquet Rayons de bonheur', descr:'je te doit le bonheur',prix:4000.00,image:'http://localhost:3000/images/Bjasmin.jpg' },
      
    ]);
  
    

    
    await sequelize.models.Users.bulkCreate([
      { login: 'user1', PSW:await bcrypt.hash("123abc", 10) ,nomComplet:'Bouaichi Billal'},
      { login: 'user2', PSW:await bcrypt.hash("123abc", 10) ,nomComplet:'Bouaichi Billy'},
    
    ]);
   
  // Insérer les associations entre utilisateurs, bouquets et fleurs
  const user1 = await Users.findOne({ where: { login: 'user1' } });
  const user2 = await Users.findOne({ where: { login: 'user2' } });

  const bouquet1 = await Bouquets.findOne({ where: { nom: 'Bouquet joie' } });
  const bouquet2 = await Bouquets.findOne({ where: { nom: 'Bouquet Rayons de bonheur' } });

  const fleur1 = await Fleurs.findOne({ where: { nom: 'Hortensia' } });
  const fleur2 = await Fleurs.findOne({ where: { nom: 'Calla' } });
  const fleur3 = await Fleurs.findOne({ where: { nom: 'Amaryllisv' } });

  // Ajouter des likes de bouquets par des utilisateurs
  await user1.addBouquet(bouquet1);
  await user1.addBouquet(bouquet2);
  await user2.addBouquet(bouquet2);
/*
  // Ajouter des fleurs à des bouquets
  await bouquet1.addFleur(fleur1);
  await bouquet1.addFleur(fleur2);
  await bouquet2.addFleur(fleur3);
  */

  console.log(bouquet1.nom);
    // Ajout de 3 fleurs de type 1 au bouquet1
await bouquet1.addFleur(fleur1, { through: { quantite: 3 } });

// Ajout de 5 fleurs de type 2 au bouquet1
await bouquet1.addFleur(fleur2, { through: { quantite: 5 } });

// Ajout de 10 fleurs de type 3 au bouquet2
await bouquet2.addFleur(fleur3, { through: { quantite: 10 } });
  
  };
  module.exports = insertData;