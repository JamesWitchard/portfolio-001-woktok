module.exports = (sequelize, DataTypes) => {
	const Tags = sequelize.define("Tags", {
		tag: {
			type: DataTypes.STRING,
			allowNull: false
		},
	});

	return Tags;
};