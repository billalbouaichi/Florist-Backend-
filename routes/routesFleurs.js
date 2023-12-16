const express = require("express");
const serviceFleurs =require("../services/serviceFleurs");
const router = express.Router();

router.route('/').get(serviceFleurs.getAllFlowers);
router.route('/:id').get(serviceFleurs.getFlowerWithId);

module.exports = router;