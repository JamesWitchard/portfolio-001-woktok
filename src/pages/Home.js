import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";

const Home = () => {
	const [listOfRecipes, setListOfRecipes] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:3001/recipes").then((res) => {
			setListOfRecipes(res.data);
		});
	}, []);

	return (
		<div>
			{listOfRecipes.map((recipe, key) => {
				return (
					<div className="recipe" key={recipe.createdAt}>
						<div className="dish">{recipe.dish}</div>
						<div className="description">{recipe.descriptionText}</div>
						<ol>
							{recipe.directions.map((step, ind) => {
								return <li key={ind}>{step}</li>
							})}
						</ol>
						<div className="footer">{recipe.author}</div>
					</div>
				);
			})}
		</div>
	);
};

export default Home;