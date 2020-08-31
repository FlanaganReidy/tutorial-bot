const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const recipe_book  = sequelize.define('recipe_book', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	recipe: Sequelize.TEXT,
	username: Sequelize.STRING,
	try_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	}
});



module.exports = recipe_book;

