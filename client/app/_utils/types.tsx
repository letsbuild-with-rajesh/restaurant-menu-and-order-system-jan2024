export type Dish = {
	id: string
	name: string
	dishType: string
	description: string
	price: number
}

export type dishesQueryResponse = {
	getDishes?: Dish[];
}

type DishWithoutId = Omit<Dish, 'id'>

type Order = {
	id: string
	customerName: string
	items: [{
		dish: DishWithoutId
		quantity: number
	}]
	totalAmount: number
}

export type ordersQueryResponse = {
	getOrders?: Order[];
}
