const DishResolver = require('./DishResolver.js')
const OrderResolver = require('./OrderResolver.js')

const resolvers = {
	Query: {
		getDishes: DishResolver.getDishes,
		getOrders: OrderResolver.getOrders,
		getOrder: OrderResolver.getOrder,
	},
	Mutation: {
		createDish: DishResolver.createDish,
		editDish: DishResolver.editDish,
		deleteDish: DishResolver.deleteDish,
		createOrder: OrderResolver.createOrder,
		deleteOrder: OrderResolver.deleteOrder,
	}
}

module.exports = { resolvers }