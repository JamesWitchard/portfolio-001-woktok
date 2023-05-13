const express = require('express');
const router = express.Router();
const {Recipes, Likes, Tags} = require('../models')
const {validateToken} = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
	const recipeList = await Recipes.findAll({include: [Likes]});
	const likedRecipes = await Likes.findAll({where: {UserId: req.user.id}});
	res.json({recipeList: recipeList, likedRecipes: likedRecipes});
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const recipe = await Recipes.findByPk(id);
	res.json(recipe);
})

router.get("/user/:id", async (req, res) => {
	const id = req.params.id;
	const recipeList = await Recipes.findAll({where: {UserId: id}});
	res.json(recipeList);
})

router.post("/", validateToken, async (req, res) => {
	const {userTags, ...recipe} = req.body;
	recipe.author = req.user.username;
	recipe.UserId = req.user.id;

	// Create the recipe and get its id
	const createdRecipe = await Recipes.create(recipe);
	const recipeId = createdRecipe.id;

	//create tag objects with the RecipeId association
	const tags = userTags.map(tag => ({
		tag: tag,
		RecipeId: recipeId,
	}));

	// Create the tags and associate them with the recipe
	await Tags.bulkCreate(tags);
	res.json(createdRecipe);
});

router.delete("/:id", validateToken, async (req, res) => {
	const id = req.params.id;
	await Recipes.destroy({where: {id: id}});
	res.json("Post deleted successfully.");

});

module.exports = router;