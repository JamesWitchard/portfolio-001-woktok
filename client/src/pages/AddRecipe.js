import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup'
import axios from "axios";
import pageStyle from '../styles/pages/AddRecipe.module.css'
import formStyle from '../styles/components/Form.module.css'
import {AuthContext} from "../helpers/AuthContext";
import HashtagField from "../components/HashtagField";

const AddRecipe = () => {

	const [ingredientsList, setIngredientsList] = useState([]);
	const [directionsList, setDirectionsList] = useState([]);
	const [hashtags, setHashtags] = useState([]);
	const {authState} = useContext(AuthContext);

	const initialValues = {
		dish: "",
		description: "",
		ingredient: "",
		direction: "",
	}

	const validationSchema = Yup.object().shape({
		dish: Yup.string().required(),
		description: Yup.string(),
		ingredient: Yup.string(),
		direction: Yup.string(),
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

	const handleAddHashtag = (newHashtag) => {
	    setHashtags([...hashtags, newHashtag]);
	};

	const handleDeleteHashtag = (hashtagId) => {
		setHashtags(hashtags.filter((hashtag, index) => index !== hashtagId));
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
				"userTags": hashtags,
				"author": data.author
			},
				{
					headers: {
						accessToken: localStorage.getItem("accessToken"),
                    }
				}).then((res) => {
				console.log("Recipe submitted successfully.")
				console.log(res.data);
				navigate("/");
			})
		} catch (error) {
			console.error(error)
		} finally {
			setSubmitting(false);
		}

	}

	useEffect(() => {
		if(!localStorage.getItem("accessToken")) {
			navigate("/login");
		}
	}, [])

	return (
		<div className={formStyle.container}>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				{({values, setFieldValue, errors}) => (
					<Form className={formStyle.form}>
						<label className={formStyle.required}>Dish:</label>
						<ErrorMessage name="dish" component="span"/>
						<Field id="inputDishName" name="dish" placeholder="Name of the Dish"/>
						<label>Description:</label>
						<Field id="inputDescription" name="description" placeholder="A brief description of the dish."/>
						<label className={formStyle.required}>Ingredients:</label>
						<ErrorMessage name="ingredient" component="span"/>
						{ ingredientsList.length > 0 && (
							<div className={`${pageStyle.adder} ${pageStyle.ingredients}`}>
								<ul>
									{ingredientsList && ingredientsList.map((ingredient, key) => {
										return (
											<div className={pageStyle.addedEntry} key={key}>
												<li>{ingredient} </li>
												<span className={pageStyle.delete} onClick={
													() => handleDelete(ingredientsList, setIngredientsList, key)
												}>x</span>
											</div>

										);
									})}
								</ul>
							</div>
						)}
						<div className={pageStyle.adderContainer}>
								<Field className={pageStyle.inputIngredient} name="ingredient" placeholder="Ingredients..."/>
								<button className={formStyle.btn} disabled={!values.ingredient} type="button"
								        onClick={() => addIngredient(values.ingredient, setFieldValue)}>+</button>
							</div>
						<label className={formStyle.required}>Directions:</label>
						<ErrorMessage name="direction" component="span"/>
						{ directionsList.length > 0 && (
							<div className={`${pageStyle.adder} ${pageStyle.directions}`}>
								<ol>
									{directionsList && directionsList.map((direction, key) => {
										return (
											<div className={pageStyle.addedEntry} key={key}>
												<li>{direction} </li>
												<span className={pageStyle.delete} onClick={
													() => handleDelete(directionsList, setDirectionsList, key)
												}>x</span>
											</div>
										)
									})}
								</ol>
							</div>
						)}
						<div className={pageStyle.adderContainer}>
							<Field className={pageStyle.inputIngredient} name="direction" placeholder="Directions..."/>
							<button className={formStyle.btn} disabled={!values.direction} type="button"
							        onClick={() => addDirection(values.direction, setFieldValue)}>+</button>
						</div>
						<label>Tags:</label>
						<HashtagField hashtags={hashtags} handleAddHashtag={handleAddHashtag}
						              handleDeleteHashtag={handleDeleteHashtag} placeholder="Add tags here..."/>

						<div className={pageStyle.spacer}> </div>

						<button className={formStyle.btn} type="submit" disabled={Object.keys(errors).length > 0}>Submit</button>
					</Form>
				)}

			</Formik>
		</div>
	);
};

export default AddRecipe;