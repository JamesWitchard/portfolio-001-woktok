const express = require('express');
const router = express.Router();
const {Recipes} = require('../models')

router.get("/", async (req, res) => {
	const recipeList = await Recipes.findAll();
	res.json(recipeList);
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const recipe = await Recipes.findByPk(id);
	res.json(recipe);
})

router.post("/", async (req, res) => {
	const recipe = req.body;
	await Recipes.create(recipe);
	res.json(recipe);
});

module.exports = router;