import React, {useEffect, useState} from 'react';
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import style from "../styles/pages/Home.module.css";
import {useNavigate} from "react-router-dom";


const Home = () => {
	const [listOfRecipes, setListOfRecipes] = useState([]);
	let navigate = useNavigate();

	useEffect(() => {
		axios.get("http://localhost:3001/recipes").then((res) => {
			setListOfRecipes(res.data);
		});
	}, []);

	return (
		<div className={style.container}>
			{listOfRecipes.map((recipe) => {
				return (
					<div className={style.recipeContainer} onClick={() => {
						navigate(`/recipe/${recipe.id}`)
					}}>
						<RecipeCard key={recipe.createdAt} recipeData={recipe}/>
					</div>
				);
			})}
		</div>
	);
};

export default Home;