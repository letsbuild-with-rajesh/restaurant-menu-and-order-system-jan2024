const mongoose = require('mongoose')

const DishSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	dishType: {
		type: String,
		enum: ['STARTER', 'MAIN_COURSE', 'DESSERT'],
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: false,
		default: "",
	},
});

module.exports = mongoose.model('Dish', DishSchema);
