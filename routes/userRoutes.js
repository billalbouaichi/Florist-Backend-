const express = require("express");
const serviceUser =require("../services/serviceUser");
const verifieToken = require('../middlewares/verifieToken')
const router = express.Router();


router.route('/info').get(verifieToken,serviceUser.getUserInfo);
router.route('/likedbouquets').get(verifieToken,serviceUser.getLikedBouquets);
router.route("/like/:id").post(verifieToken,serviceUser.addLike);
router.route("/dislike/:id").post(verifieToken,serviceUser.removeLike);

module.exports= router;