const express = require('express');
const router = express.Router();
const {Users} = require('../models')
const bcrypt = require('bcrypt')
const {sign} = require('jsonwebtoken')
const {validateToken} = require("../middlewares/AuthMiddleware");

router.get('/', validateToken, (req, res) => {
	res.json(req.user)
})

router.post("/", async (req, res) => {
	const {username, password} = req.body;
	bcrypt.hash(password, 10).then(hash => {
		Users.create({
			username: username,
			password: hash,
		});
		res.json("Successfully created user");
	});
});

router.post("/login", async (req, res) => {
	const {username, password} = req.body;
	const user = await Users.findOne({where: {username: username}});

	if (!user) return res.json({error: 'User does not exist.'})

	bcrypt.compare(password, user.password).then(match => {
		if (!match)
			return res.json({error: "Wrong username/password combination."});

		const accessToken = sign({
			username: user.username,
			id: user.id
		}, process.env.ACCESS_TOKEN_SECRET)
		res.json(accessToken)
	})
})

module.exports = router;