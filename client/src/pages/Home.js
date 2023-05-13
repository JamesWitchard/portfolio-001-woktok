import React, {useContext, useEffect, useState} from 'react';
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import style from "../styles/pages/Home.module.css";
import {useNavigate} from "react-router-dom";
import BlankUser from "../components/BlankUser";
import {Favorite, FavoriteBorder, Delete} from "@mui/icons-material";
import {AuthContext} from "../helpers/AuthContext";


const Home = () => {
	const [listOfRecipes, setListOfRecipes] = useState([]);
	const [likedRecipes, setLikedRecipes] = useState([]);
	const {authState} = useContext(AuthContext);
	let navigate = useNavigate();

	const handleLike = (recipeId) => {
		axios.post(`http://localhost:3001/likes`, {
			RecipeId: recipeId
		}, {
			headers: {
				accessToken: localStorage.getItem("accessToken"),
			}
		}).then((res) => {
			setListOfRecipes(listOfRecipes.map((recipe) => {
				if (recipe.id === recipeId) {
					if (res.data.likeAdded) {
						return {...recipe, Likes: [...recipe.Likes, 0]};
					} else {
						const likesArray = recipe.Likes;
						likesArray.pop();
						return {...recipe, Likes: likesArray};
					}
				} else {
					return recipe;
				}
			}));
			if (likedRecipes.includes(recipeId)) {
				setLikedRecipes(likedRecipes.filter((like) => like !== recipeId));
			} else {
				setLikedRecipes([...likedRecipes, recipeId]);
			}
		});
	};

	const handleDelete = (recipeId) => {
		axios.delete(`http://localhost:3001/recipes/${recipeId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((res) => {
            setListOfRecipes(listOfRecipes.filter((recipe) => recipe.id !== recipeId));
        });
	}

	useEffect(() => {
		if (!localStorage.getItem("accessToken")) {
			navigate("/login");
		}
		axios.get("http://localhost:3001/recipes",
			{
				headers: {
					accessToken: localStorage.getItem("accessToken")
				}
			}).then((res) => {
			setListOfRecipes(res.data.recipeList.reverse());
			setLikedRecipes(
				res.data.likedRecipes.map((like) => like.RecipeId)
			);
		});
	}, []);

	return (
		<div className={style.container}>
			{listOfRecipes.map((recipe) => {
				return (
					<div className={style.cardContainer}>
						<div className={style.recipeContainer} onClick={() => {
							navigate(`/recipe/${recipe.id}`)
						}}>
							<RecipeCard key={recipe.createdAt} recipeData={recipe}/>

						</div>
						<div className={style.postControls}>
							{authState.username === recipe.author &&
								<div className={style.buttonContainer}>
									<div className={style.deleteButton} onClick={() => handleDelete(recipe.id)}>
										<Delete fontSize="large"/>
									</div>
								</div>
							}
							<div className={style.buttonContainer}>
								<div className={style.likeButton} onClick={() => handleLike(recipe.id)}>
									{
										likedRecipes.includes(recipe.id) ?
											<Favorite className={style.liked} fontSize="large"/> :
											<FavoriteBorder fontSize="large"/>
									}
								</div>
								<span>{recipe.Likes.length}</span>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Home;