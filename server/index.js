const express = require('express');
const cors = require('cors')
const db = require('./models');
const app = express();
require('dotenv').config();


app.use(express.json());
app.use(cors());
// Routers
const recipeRouter = require('./routes/Recipes');
app.use("/recipes", recipeRouter);
const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);
const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);
const likesRouter = require('./routes/Likes');
app.use("/likes", likesRouter);
const tagsRouter = require('./routes/Tags');
app.use("/tags", tagsRouter);


db.sequelize.sync().then(() => {
	app.listen(process.env.PORT, () => {
		console.log(`Server running on port ${process.env.PORT}`)
	});
});

