const mongoose = require('mongoose')
const Dish = require('../models/Dish.js')
const Order = require('../models/Order.js')

const getTotalAmountOfItems = (items) => {
	return items.reduce((acc, val) => acc + (val.dish.price * val.quantity), 0);
}

const getDishes = async (items) => {
	return await Promise.all(items.map(async (item) => {
		const dishes = (await Dish.find({})).reduce((acc, dish) => ({ ...acc, [dish._id]: dish }), {});
		const dish = dishes[item.dish];
		return {
			dish: {
				id: dish._id,
				dishType: dish.dishType,
				description: dish.description,
				name: dish.name,
				price: dish.price,
			},
			quantity: item.quantity,
		}
	}))
}

const OrderResolver = {
	getOrder: (_, args) => {
		try {
			return Order.findById(args.id)
				.then(async (order) => {
					const items = await getDishes(order.items);
					return {
						id: order._id,
						customerName: order.customerName,
						items,
						totalAmount: getTotalAmountOfItems(items)
					}
				})
		} catch {
			return {
				msg: "Gettings Order failed!"
			}
		}
	},
	getOrders: async () => {
		try {
			const orders = await Order.find({});
			if (orders.length === 0) {
				return []
			}
			return (await Promise.all(orders.map(async (order) => {
				const items = await getDishes(order.items);
				return {
					id: order._id,
					customerName: order.customerName,
					items,
					totalAmount: getTotalAmountOfItems(items)
				}
			})));
		} catch {
			return {
				msg: "Gettings Orders failed!"
			}
		}
	},
	createOrder: async (_, args) => {
		try {
			const newOrder = new Order(args.input);
			newOrder.save();
			const items = await getDishes(newOrder.items);
			const data = {
				id: newOrder._id,
				customerName: newOrder.customerName,
				items,
				totalAmount: getTotalAmountOfItems(items)
			};
			return data;
		} catch {
			return {
				msg: "Order creation failed!"
			}
		}
	},
	deleteOrder: async (_, args) => {
		try {
			await Order.findByIdAndDelete(args.id);
			return {
				msg: "Deleted successfuly!"
			};
		} catch {
			return {
				msg: "Delete failed!"
			}
		}
	}
}

module.exports = OrderResolver;
