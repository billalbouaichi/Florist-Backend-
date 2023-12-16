const express = require("express");
const serviceBouquets =require("../services/serviceBouquets");
const router = express.Router();



router.route("/").get(serviceBouquets.getAllBouquetsWithFleurs);
router.route("/:id").get(serviceBouquets.getBouquetsWithId);

module.exports=router;