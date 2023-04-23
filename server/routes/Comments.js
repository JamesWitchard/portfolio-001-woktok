const express = require('express');
const router = express.Router();
const {Comments, Recipes} = require('../models');

router.get("/:recipeId", async (req, res) => {
	const recipeId = req.params.recipeId;
	const comments = await Comments.findAll({ where: {
			RecipeId: recipeId,
		}});
	res.json(comments);
})

router.post("/", async (req, res) => {
	const comment = req.body;
	await Comments.create(comment);
	res.json(comment);
});

module.exports = router;