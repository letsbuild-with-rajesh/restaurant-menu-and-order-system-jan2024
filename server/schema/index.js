const gql = require("graphql-tag");

// create a graphql schema for restaurant dishes
const typeDefs = gql`
	enum DishType {
		STARTER
		MAIN_COURSE
		DESSERT
	}

	type Dish {
		id: ID!
		name: String!
		dishType: DishType!
		price: Float!
		description: String
	}

	input DishInput {
		name: String!
		dishType: DishType!
		price: Float!
		description: String
	}

	type Item {
		dish: Dish!
		quantity: Int!
	}

	input ItemInput {
		dish: String!
		quantity: Int!
	}

	type Order {
		id: ID!
		customerName: String!
		items: [Item!]!
		totalAmount: Int!
	}

	input OrderInput {
		customerName: String!
		items: [ItemInput!]
	}

	type DeleteResponse {
		msg: String!
	}

	type Query {
		getDishes: [Dish]
		getOrders: [Order]
		getOrder(id: ID): Order
	}

	type Mutation{
		createDish(input: DishInput!): Dish!
		editDish(id:ID!, input: DishInput!): Dish!
		deleteDish(id: ID!): DeleteResponse!
		createOrder(input: OrderInput!): Order!
		deleteOrder(id: ID!): DeleteResponse!
	}

`;

// Add mutations above

module.exports = { typeDefs }
