import { gql } from "@apollo/client";

export const GET_DISHES = gql`
  query {
    getDishes {
      id
      name
			dishType
			description
      price
    }
  }
`;

export const CREATE_DISH = gql`
	mutation CreateDish($input: DishInput!) {
	  createDish(input: $input) {
	    description
	    id
	    dishType
	    name
	    price
	  }
	}
`;

export const EDIT_DISH = gql`
	mutation EditDish($editDishId: ID!, $input: DishInput!) {
	  editDish(id: $editDishId, input: $input) {
	    id
	    name
	    dishType
	    price
	    description
	  }
	}
`;

export const DELETE_DISH = gql`
  mutation Mutation($deleteDishId: ID!) {
    deleteDish(id: $deleteDishId) {
      msg
    }
  }
`;
