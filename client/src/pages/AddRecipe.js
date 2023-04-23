import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup'
import axios from "axios";
import "./AddRecipe.styles.css"
import {useNavigate} from "react-router-dom";

const AddRecipe = () => {

	const [ingredientsList, setIngredientsList] = useState([]);
	const [directionsList, setDirectionsList] = useState([]);

	const initialValues = {
		dish: "",
		description: "",
		ingredient: "",
		direction: "",
		author: ""
	}

	const validationSchema = Yup.object().shape({
		dish: Yup.string().required(),
		description: Yup.string(),
		ingredient: Yup.string(),
		direction: Yup.string(),
		author: Yup.string().required()
	});

	let navigate = useNavigate();

	const addIngredient = (ingredient, setFieldValue) => {
		setIngredientsList([...ingredientsList, ingredient])
		setFieldValue("ingredient", "")
	}
	const addDirection = (direction, setFieldValue) => {
		setDirectionsList([...directionsList, direction]);
		setFieldValue("direction", "")
	}

	const handleDelete = (arr, arrSet, key) => {
		arrSet(arr.filter((val, index) => {
			return index !== key;
		}))
	}

	const onSubmit = (data, {setSubmitting, setFieldError}) => {
		try {
			if (ingredientsList.length === 0) {
				setFieldError("ingredient", "Dish needs at least one ingredient.")
				return;
			}
			if (directionsList.length === 0) {
				setFieldError("direction", "Dish needs at least one instruction.")
				return;
			}
			axios.post("http://localhost:3001/recipes", {
				"dish": data.dish,
				"descriptionText": data.description,
				"directions": directionsList,
				"author": data.author
			}).then((res) => {
				console.log("Recipe submitted successfully.")
				navigate("/");
			})
		} catch (error) {
			console.error(error)
		} finally {
			setSubmitting(false);
		}

	}

	return (
		<div className="addRecipePage">
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				{({values, setFieldValue, errors}) => (
					<Form className="recipeForm">
						<label>Dish:</label>
						<ErrorMessage name="dish" component="span"/>
						<Field id="inputDishName" name="dish" placeholder="Name of the Dish"/>
						<label>Description:</label>
						<Field id="inputDescription" name="description" placeholder="A brief description of the dish."/>
						<label htmlFor="">Ingredients:</label>
						<ErrorMessage name="ingredient" component="span"/>
						{ ingredientsList.length > 0 && (
							<div className="adder ingredients">
								<ul>
									{ingredientsList && ingredientsList.map((ingredient, key) => {
										return (
											<div className="addedEntry" key={key}>
												<li>{ingredient} </li>
												<span className="delete" onClick={
													() => handleDelete(ingredientsList, setIngredientsList, key)
												}>x</span>
											</div>

										);
									})}
								</ul>
							</div>
						)}
						<div className="adderContainer">
								<Field className="inputIngredient" name="ingredient" placeholder="Ingredients..."/>
								<button disabled={!values.ingredient} type="button"
								        onClick={() => addIngredient(values.ingredient, setFieldValue)}>+</button>
							</div>
						<label>Directions:</label>
						<ErrorMessage name="direction" component="span"/>
						{ directionsList.length > 0 && (
							<div className="adder directions">
								<ol>
									{directionsList && directionsList.map((direction, key) => {
										return (
											<div className="addedEntry" key={key}>
												<li>{direction} </li>
												<span className="delete" onClick={
													() => handleDelete(directionsList, setDirectionsList, key)
												}>x</span>
											</div>
										)
									})}
								</ol>
							</div>
						)}
						<div className="adderContainer">
							<Field className="inputIngredient" name="direction" placeholder="Directions..."/>
							<button disabled={!values.direction} type="button"
							        onClick={() => addDirection(values.direction, setFieldValue)}>+</button>
						</div>
						<label>Author:</label>
						<ErrorMessage name="author" component="span"/>
						<Field id="inputAuthorName" name="author" placeholder="Richard"/>

						<div className="spacer"> </div>

						<button type="submit" disabled={Object.keys(errors).length > 0}>Submit</button>
					</Form>
				)}

			</Formik>
		</div>
	);
};

export default AddRecipe;