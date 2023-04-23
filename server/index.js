const express = require('express');
const cors = require('cors')
const db = require('./models');
const app = express();

app.use(express.json());
app.use(cors());
// Routers
const recipeRouter = require('./routes/Recipes');
app.use("/recipes", recipeRouter);
const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);
const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);


db.sequelize.sync().then(() => {
	app.listen(3001, () => {
		console.log("Server running on port 3001")
	});
});
