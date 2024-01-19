"use client"
import { useMutation } from '@apollo/client';
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import DishModal from "../_components/DishModal";
import { dishesQueryResponse } from '../_utils/types';
import { CREATE_DISH, EDIT_DISH, DELETE_DISH, GET_DISHES } from "../_queries/dishes";
import { DISH_TYPE_LABELS } from '../_utils/constants';

export default function Customer() {
	const { data } = useSuspenseQuery<dishesQueryResponse>(GET_DISHES);
	const dishes = data.getDishes;

	const [createDish] = useMutation(CREATE_DISH);
	const [editDish] = useMutation(EDIT_DISH);
	const [deleteDish] = useMutation(DELETE_DISH);

	const handleCreateDish = (name: string, dishType: string, description: string, price: number) => {
		if (!name || !dishType || !description || isNaN(price)) {
			alert('Please check if all inputs are valid!');
		}
		const payload = {
			variables: {
				input: {
					name,
					dishType,
					description,
					price,
				}
			}
		}
		createDish(payload);
		window.location.reload();
	}

	const handleEditDish = (name: string, dishType: string, description: string, price: number, id: string) => {
		if (!name || !dishType || !description || isNaN(price)) {
			alert('Please check if all inputs are valid!');
		}

		const payload = {
			variables: {
				editDishId: id,
				input: {
					name,
					dishType,
					description,
					price,
				}
			}
		}

		editDish(payload);
		window.location.reload();
	}

	const handleDeleteDish = (id: string) => {
		const answer = confirm('Are you sure you want to delete this dish?');
		if (answer) {
			const payload = {
				variables: {
					deleteDishId: id
				}
			}
			deleteDish(payload);
		}
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
								<th scope="col">Edit</th>
								<th scope="col">Delete</th>
							</tr>
						</thead>
						<tbody>
							{dishes?.map((dish, id) => {
								return (
									<tr key={`dish-${dish.id}`}>
										<td className="p-3">{id + 1}</td>
										<td className="p-3">{dish.name}</td>
										<td className="p-3">{DISH_TYPE_LABELS[dish.dishType]}</td>
										<td className="p-3" style={{ maxWidth: '300px' }}>
											{dish.description ? dish.description : '-'}
										</td>
										<td className="p-3">{dish.price.toString()}</td>
										<td className="p-3">
											<DishModal action="Edit" modalKey={`edit-${dish.id}`} actionFn={handleEditDish} dish={dish} />
										</td>
										<td className="p-3">
											<button className='btn btn-danger rounded-circle' onClick={() => handleDeleteDish(dish.id)}>
												&#10006;
											</button>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
					<DishModal action="Create" modalKey="create" actionFn={handleCreateDish} />
				</div>
			</div>
		</main>
	)
}
