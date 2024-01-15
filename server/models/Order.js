const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
	dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' },
	quantity: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema({
	customerName: {
		type: String,
		require: true,
	},
	items: {
		type: [ItemSchema],
		required: true,
	}
});

module.exports = mongoose.model('Order', OrderSchema);
