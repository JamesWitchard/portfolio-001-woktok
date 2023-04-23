import React from 'react';
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import "./Home.styles.css"

const Home = () => {
	const [listOfRecipes, setListOfRecipes] = useState([]);
	let navigate = useNavigate();

	useEffect(() => {
		axios.get("http://localhost:3001/recipes").then((res) => {
			setListOfRecipes(res.data);
		});
	}, []);

	return (
		<div className="homeContainer">
			{listOfRecipes.map((recipe, key) => {
				return (
					<div className="recipeCard" key={recipe.createdAt} onClick={() => {navigate(`/recipe/${recipe.id}`)}}>
						<div className="dishContainer">
							<h1>{recipe.dish}</h1>
							<h3>{recipe.descriptionText}</h3>
						</div>
						<div className="directionsContainer">
							<ol>
								{recipe.directions.map((step, ind) => {
									return <li key={ind}>{step}</li>
								})}
							</ol>
						</div>
						<div className="redLine"/>
						<div className="footerContainer">{recipe.author}</div>
					</div>
				);
			})}
		</div>
	);
};

export default Home;