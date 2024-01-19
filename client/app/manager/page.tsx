"use client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { ordersQueryResponse } from '../_utils/types';
import { GET_ORDERS } from "../_queries/orders";
import DishModal from "../_components/DishModal";
import Link from "next/link";

export default function Manager() {
	const { data } = useSuspenseQuery<ordersQueryResponse>(GET_ORDERS);

	const orders = data.getOrders;

	return (
		<main>
			<div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
				<div className="d-flex flex-column align-items-center" style={{ maxWidth: '1200px' }}>
					<h1>Orders</h1>
					<table className="table table-bordered">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Customer Name</th>
								<th scope="col">Items</th>
								<th scope="col">Total Amount</th>
							</tr>
						</thead>
						<tbody>
							{orders?.map((order, id) => {
								return (
									<tr key={`order-${order.id}`}>
										<td className="p-3">{id + 1}</td>
										<td className="p-3">{order.customerName}</td>
										<td className="p-3">{order.items.length > 0
											? order.items.map(item => {
												const amount = item.dish.price * item.quantity;
												return (
													<div key={item.dish.name}>
														{`${item.dish.name} = ${item.dish.price} * ${item.quantity} = ${amount}`}
													</div>
												)
											})
											: '-'}</td>
										<td className="p-3">{order.totalAmount.toString()}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
					<button className="btn btn-info" onClick={() => {
						window.location.href = "/dish";
					}}>View Dishes</button>
				</div>
			</div>
		</main >
	)
}
