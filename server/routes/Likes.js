const express = require('express');
const router = express.Router();
const { Likes } = require('../models');
const {validateToken} = require("../middlewares/AuthMiddleware");

router.post('/', validateToken, async (req, res) => {
	const {RecipeId} = req.body;
	const UserId = req.user.id;

	const likeFound = await Likes.findOne({
		where: {
			RecipeId: RecipeId,
			UserId: UserId
		}
	});

	if (!likeFound) {
		await Likes.create({
			RecipeId: RecipeId,
			UserId: UserId
		});
		res.json({likeAdded: true});
	} else {
		await Likes.destroy({
			where: {
				RecipeId: RecipeId,
				UserId: UserId,
			}
		});
		res.json({likeAdded: false});
	}
})

module.exports = router;