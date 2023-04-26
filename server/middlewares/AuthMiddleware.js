const {verify} = require('jsonwebtoken');

const validateToken = (req, res, next) => {
	const accessToken = req.header("accessToken");

	if (!accessToken) return res.json({error: "User not logged in."});

	try {
		const validToken = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
		if (validToken) {
			req.user = validToken;
			return next();
		}
	} catch (err) {
		console.log(error)
		return res.json({error: err});
	}
};

module.exports = {validateToken};