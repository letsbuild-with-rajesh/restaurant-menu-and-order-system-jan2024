const Dish = require('../models/Dish.js')

const DishResolver = {
	getDishes: () => {
		try {
			return Dish.find({})
				.then((dishes) => {
					if (dishes.length === 0) {
						return []
					}
					return dishes.map((dish) => ({
						id: dish._id,
						name: dish.name,
						dishType: dish.dishType,
						price: dish.price,
						description: dish.description,
					}))
						.sort((a, b) => a.dishType.localeCompare(b.dishType));
				})
		} catch {
			return {
				msg: "Getting Orders failed!"
			}
		}
	},
	createDish: (_, args) => {
		try {
			const newDish = new Dish(args.input);
			return newDish.save();
		} catch {
			return {
				msg: "Dish creation failed!"
			}
		}
	},
	editDish: async (_, args) => {
		try {
			const dish = await Dish.findById(args.id);
			dish.name = args.input.name;
			dish.dishType = args.input.dishType;
			dish.description = args.input.description;
			dish.price = args.input.price;
			return await dish.save();
		} catch {
			return {
				msg: "Dish editing failed!"
			}
		}
	},
	deleteDish: async (_, args) => {
		try {
			await Dish.findByIdAndDelete(args.id);
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

module.exports = DishResolver;
