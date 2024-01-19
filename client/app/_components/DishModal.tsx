"use client"
import { useEffect, useRef } from "react";
import { Dish } from "../_utils/types";

type DishModalProps = {
	modalKey: string,
	action: string,
	actionFn: Function,
	dish?: Dish,
}

const LABELS: { [key: string]: { [key: string]: string } } = {
	'Create': {
		'button': 'Create Dish',
		'title': 'Create Dish',
		'save_button': 'Create',
	},
	'Edit': {
		'button': `&#9998;`,
		'title': 'Edit Dish',
		'save_button': 'Save',
	}
}

export default function DishModal(props: DishModalProps) {
	const {
		modalKey,
		action,
		actionFn,
		dish,
	} = props;
	const nameRef = useRef<HTMLInputElement | null>(null);
	const dishTypeRef = useRef<HTMLSelectElement | null>(null);
	const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
	const priceRef = useRef<HTMLInputElement | null>(null);

	const resetRef = (ref: any, value: string | number = '') => {
		if (ref.current) {
			ref.current.value = value;
		}
	}

	const resetDish = () => {
		if (action === "Create") {
			resetRef(nameRef);
			resetRef(dishTypeRef, 'STARTER');
			resetRef(descriptionRef);
			resetRef(priceRef);
		} else {
			resetRef(nameRef, dish?.name);
			resetRef(dishTypeRef, dish?.dishType);
			resetRef(descriptionRef, dish?.description);
			resetRef(priceRef, dish?.price);
		}
	}

	useEffect(resetDish, []);

	const handleAction = () => {
		actionFn(
			nameRef.current?.value,
			dishTypeRef.current?.value,
			descriptionRef.current?.value,
			Number(priceRef.current?.value),
			dish?.id,
		)
		resetDish();
		document.getElementById('closeModal')?.click();
	}

	const CreateDishButton = <button
		type="button"
		className="btn btn-primary"
		data-bs-toggle="modal"
		data-bs-target={`#${modalKey}-createDishModal`}
	>
		Create Dish
	</button>;

	const EditDishButton = <button
		type="button"
		className="btn btn-info rounded-circle"
		data-bs-toggle="modal"
		data-bs-target={`#${modalKey}-createDishModal`}
	>
		&#9998;
	</button>;

	const modalBtn = action === "Create" ? CreateDishButton : EditDishButton;

	return (
		<div>
			{modalBtn}
			<div className="modal fade" id={`${modalKey}-createDishModal`} role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">{LABELS[action].title}</h5>
							<button id="closeModal" type="button" className="btn-close" onClick={resetDish} data-bs-dismiss="modal" aria-label="Close" />
						</div>
						<div className="modal-body">
							<form>
								<div className="form-group">
									<label className="col-form-label">Name:</label>
									<input ref={nameRef} type="text" className="form-control" />
								</div>
								<div className="form-group">
									<label className="col-form-label">Dish Type:</label>
									<select ref={dishTypeRef} className="form-control">
										<option value="STARTER">Starter</option>
										<option value="MAIN_COURSE">Main Course</option>
										<option value="DESSERT">Dessert</option>
									</select>
								</div>
								<div className="form-group">
									<label className="col-form-label">Description:</label>
									<textarea ref={descriptionRef} className="form-control" />
								</div>
								<div className="form-group">
									<label className="col-form-label">Price:</label>
									<input ref={priceRef} type="number" className="form-control" />
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetDish}>Close</button>
							<button type="button" className="btn btn-primary" onClick={handleAction}>{LABELS[action].save_button}</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
