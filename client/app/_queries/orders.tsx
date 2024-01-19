import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query {
    getOrders {
			customerName
			id
			items {
				dish {
					dishType
					description
					id
					name
					price
				}
				quantity
			}
			totalAmount
		}
  }
`;

export const CREATE_ORDER = gql`
	mutation CreateOrder($input: OrderInput!) {
	  createOrder(input: $input) {
	    customerName
	    id
	    items {
	      dish {
	        description
	        dishType
	        id
	        name
	        price
	      }
	    }
	  }
	}
`;

