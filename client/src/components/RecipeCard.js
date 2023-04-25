import React from 'react';
import {useNavigate} from 'react-router-dom'
import style from '../styles/components/RecipeCard.module.css'

const RecipeCard = ({recipeData, classOverride}) => {

	return (
			<div className={style.recipeCard}>
				<div className={style.dishContainer}>
					<h1>{recipeData.dish}</h1>
					<h3>{recipeData.descriptionText}</h3>
				</div>
				<div className={style.directionsContainer}>
					<ol>
						{recipeData.directions?.map((direction, ind) => {
							return <li>{direction}</li>;
						})}
					</ol>
				</div>
				<div className={style.redLine}/>
				<div className={style.footerContainer}>{recipeData.author}</div>
			</div>
	);
};

export default RecipeCard;