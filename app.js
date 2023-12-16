const express = require("express");
const path = require("path");

const ApiError = require("./apiError.js");
const sequelize  = require("./config");
const authRoutes=require("./routes/authRoutes.js");
const routesBouquets=require("./routes/routesBouquets.js");
const routesFleurs=require("./routes/routesFleurs.js");
const userRoutes=require("./routes/userRoutes.js");
const bodyParser = require("body-parser");
const cors = require('cors');
const globalError = require("./errorMiddleware");

///////////Connexion BD///////////////////////////


/* Synchroniser les modèles avec la base de données */
const app = express();
app.use("*", cors());
app.use(express.json({ limit: "20kb" }));
app.use(bodyParser.urlencoded({ extended: false }));
const insertData = require('./insertData'); 
const authenticateDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Synchroniser la base de données
    await sequelize.sync({ force: true ,alter:true});
    console.log('Tables synchronisées.');

    // Insérer des données
   await insertData();
  console.log('Données de test insérées avec succès.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
authenticateDatabase();

/////////////////cors methode request from client 3000 to server 5000/////////////////////////

////////////////////////////////////////////////////////////////////

//app.use("/img", express.static(path.join(__dirname, "../client/views/images")));
//app.use("/image", express.static(path.join(__dirname, "../client/views/images")));
//app.use("/images", express.static(path.join(__dirname, "../client/views/imagesB")));
//app.use("/image", express.static(path.join(__dirname, "../client/views/imagesF")));
//app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
//app.use( "/js",express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
//app.use( "/js", express.static(path.join(__dirname, "node_modules/jquery/dist")));
//app.use("/styles", express.static(path.join(__dirname, "../client/views/styles")));

/////////////npm run build cmd to access react client  from localhost 5000//////////////////
//app.use(express.static(path.join(__dirname, '../client/reactClass/build')));
//app.use(express.static(path.join(__dirname, '../client/reactFunc/build')));
///////////////////////////////////////////////////////////////

////////////API for react app function version//////////

//const Data = require("../client/reactFunc/src/data/mesBouquets.json");
//app.get("/api/bouquets", (req, res) => {
  //res.json(Data);
  //console.log("Réponse envoyée avec le code :", res.statusCode);
//});

////////////////API to SEND DATA fome SQLITE DBase//////////////////////
/*
app.get("/api/getBouquets", (req, res) => {
  Bouquets.findAll()
    .then(bouquets => {
      res.json(bouquets);
      console.log("Réponse envoyée avec le code :", res.statusCode);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des bouquets depuis la base de données:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des bouquets depuis la base de données' });
    });
});*/
/////////////////////////////////////////////////////////
/*
app.put("/api/bouquets/like/:id", (req, res) => {
  const bouquetId = parseInt(req.params.id);
  const newBouquet = Data.find((bouquet) => bouquet.id === bouquetId);
  if (newBouquet) {
    console.log(newBouquet);
    newBouquet.like = !newBouquet.like;
    res.json({
      message: 'Valeur "like" mise à jour pour le bouquet ID ' + bouquetId,
      bouquet:newBouquet
    });
  } else {
    console.log("not found " +bouquetId)
    res.status(404).json({ error: "Bouquet non trouvé" });
  }
});
*/

//////////////API for react app Class version//////////////
/*

const bouquet = require("../Data/bouquets.json");
app.get("/api/getBouquets", (req, res) => {
  res.json(bouquet);
  console.log("Réponse envoyée avec le code :", res.statusCode);
});
const fleurs = require("../Data/fleurs.json");
app.get("/api/fleurs", (req, res) => {
  res.json(fleurs);
  console.log("Réponse envoyée avec le code :", res.statusCode);
});
app.put('/api/like', (req, res) => {
  const bouquetId = parseInt(req.query.bouquetId);
  const bouquetaModifier = bouquet.find(b => b.id === bouquetId);
  if (bouquetaModifier) {
    bouquetaModifier.like = !bouquetaModifier.like ;
    
     console.log("bouquet modifier avec succés")
  } else {
    console.log(req.query.bouquetId)
    console.log("bouquet non trouver");
  }
});
*/

app.use("/api/v1/bouquets", routesBouquets);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/fleurs", routesFleurs);
app.use("/api/v1/users", userRoutes);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route :${req.originalUrl}`, 400));
});
app.use(globalError);


app.listen(process.env.PORT, () => {
  console.log("listen on port " + process.env.PORT);
});
