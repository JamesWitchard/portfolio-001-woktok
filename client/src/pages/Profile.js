import React, {useEffect, useState} from 'react';
import RecipeCard from '../components/RecipeCard';
import {useParams} from "react-router-dom";
import axios from "axios";
import style from '../styles/pages/Profile.module.css'

const Profile = () => {
	const [username, setUsername] = useState("")
	const [userRecipes, setUserRecipes] = useState([])
	const {id} = useParams()

	useEffect(() => {
		axios.get(`http://localhost:3001/auth/${id}`).then(res => {
			setUsername(res.data.username);
		});
		axios.get(`http://localhost:3001/recipes/user/${id}`).then(res => {
            setUserRecipes(res.data.reverse());
        });

	}, [id]);
	return (
		<div className={style.container}>
			<div className="basicInfo">
				<h1>Username: {username}</h1>
			</div>
			<div className="listOfRecipes">
				{userRecipes.map(recipe => {
					return <RecipeCard key={recipe.id} recipeData={recipe}/>
				})}
			</div>
		</div>
	);
};

export default Profile;