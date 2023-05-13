module.exports = (sequelize, DataTypes) => {
	const Recipes = sequelize.define("Recipes", {
		dish: {
			type: DataTypes.STRING,
			allowNull: false
		},
		descriptionText: {
			type: DataTypes.STRING,
			allowNull: true
		},
		directions: {
			type: DataTypes.JSON,
			allowNull: false
		},
		author: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	Recipes.associate = (models) => {
        Recipes.hasMany(models.Likes, {
            onDelete: "cascade"
        })

		Recipes.hasMany(models.Comments, {
			onDelete: "cascade"
		})

		Recipes.hasMany(models.Tags, {
			onDelete: "cascade",
		})
    }

	return Recipes;
};