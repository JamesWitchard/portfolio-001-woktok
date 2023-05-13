const express = require('express');
const router = express.Router();
const { Tags, Recipes} = require('../models');
const {validateToken} = require("../middlewares/AuthMiddleware");

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const tagList = await Tags.findAll({where: {RecipeId: id}});
	res.json(tagList);
})

router.post('/', validateToken, async (req, res) => {
	const {RecipeId} = req.body;
	const UserId = req.user.id;


})

module.exports = router;