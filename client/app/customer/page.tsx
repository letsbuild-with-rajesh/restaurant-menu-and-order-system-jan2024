"use client"
import { useState } from "react";
import { useMutation } from '@apollo/client';
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Dish, dishesQueryResponse } from '../_utils/types';
import { GET_DISHES } from "../_queries/dishes";
import { CREATE_ORDER } from "../_queries/orders";
import { DISH_TYPE_LABELS } from '../_utils/constants';

export default function Customer() {
	const [order, setOrder] = useState<{ [key: string]: { dish: string, quantity: number } }>({});

	const { data } = useSuspenseQuery<dishesQueryResponse>(GET_DISHES);
	const dishes = data.getDishes;

	const [createOrder] = useMutation(CREATE_ORDER);

	const addToOrder = (dish: Dish) => {
		order[dish.id] = {
			dish: dish.id,
			quantity: order[dish.id] ? order[dish.id].quantity + 1 : 1
		}
		setOrder({ ...order });
	}

	const deleteFromOrder = (dish: Dish) => {
		order[dish.id] = {
			dish: dish.id,
			quantity: order[dish.id] && order[dish.id].quantity > 0 ? order[dish.id].quantity - 1 : 0
		}
		setOrder({ ...order });
	}

	const getTotalAmount = (dishes: Dish[]) => {
		return dishes.reduce((total: number, dish: Dish) => {
			if (order[dish.id]) {
				return total + order[dish.id].quantity * dish.price;
			}
			return total;
		}, 0);
	}

	const resetOrder = () => {
		setOrder({});
	}

	const placeOrder = () => {
		var name = prompt("Please enter your name to place the order");
		if (name == null) {
			return; // prompt is cancelled
		}
		if (Object.keys(order).length === 0) {
			alert('Please add atleast one item to the order!');
			return;
		}
		if (!name || !name.match(/^[a-zA-Z]+$/)) {
			alert('Please provide a valid name');
			return;
		}
		const payload = {
			variables: {
				input: {
					customerName: name,
					items: Object.keys(order).map((dishId: string) => order[dishId])
				}
			}
		}
		createOrder(payload);
		resetOrder();
		alert('Order placed!');
	}

	return (
		<main>
			<div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
				<div className="d-flex flex-column align-items-center" style={{ maxWidth: '1200px' }}>
					<h1>Dishes</h1>
					<table className="table table-bordered">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Name</th>
								<th scope="col">Dish Type</th>
								<th scope="col">Description</th>
								<th scope="col">Price</th>
								<th scope="col">Order Quantity</th>
								<th scope="col">Sub total</th>
							</tr>
						</thead>
						<tbody>
							{dishes?.map((dish, id) => {
								const qty = order[dish.id]?.quantity ? order[dish.id]?.quantity : 0;
								return (
									<tr key={`dish-${dish.id}`}>
										<td className="p-3">{id + 1}</td>
										<td className="p-3">{dish.name}</td>
										<td className="p-3">{DISH_TYPE_LABELS[dish.dishType]}</td>
										<td className="p-3" style={{ maxWidth: '300px' }}>{dish.description ? dish.description : '-'}</td>
										<td className="p-3">{dish.price.toString()}</td>
										<td className="d-flex justify-content-between gap-1 px-3">
											<div className="d-flex justify-content-center align-items-center">{qty}</div>
											<div className="d-flex justify-content-center align-items-center p-1 gap-1">
												<button
													className="btn btn-primary rounded-circle"
													style={{ padding: '2px 9px' }}
													onClick={() => addToOrder(dish)}
													disabled={qty >= 10}
												>
													+
												</button>
												<span>/</span>
												<button
													className="btn btn-danger rounded-circle"
													style={{ padding: '2px 10px' }}
													onClick={() => deleteFromOrder(dish)}
													disabled={qty === 0}
												>
													-
												</button>
											</div>
										</td>
										<td className="p-3">{qty * dish.price}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
					<span className="p-2">Total Amount: {getTotalAmount(dishes ? dishes : [])}</span>
					<button className="btn btn-success" onClick={placeOrder}>Place Order</button>
				</div>
			</div>
		</main>
	)
}
