import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../helpers/AuthContext";
import RecipeCard from "../components/RecipeCard";
import style from "../styles/pages/Recipe.module.css";
import CommentCard from "../components/CommentCard";
import RecipeInfo from "../components/RecipeInfo";


const Recipe = () => {
	const [recipeData, setRecipeData] = useState({});
	const [recipeCreatedDate, setRecipeCreatedDate] = useState(new Date());
	const [commentsData, setCommentsData] = useState([]);
	const [userTagsData, setUserTagsData] = useState([]);
	const [pageUrl, setPageUrl] = useState("");
	const [commentInput, setCommentInput] = useState("")

	const {setSidebarVisible} = useContext(AuthContext);

	let {id} = useParams();

	// Button handlers
	const handleSubmitComment = () => {
		if (commentInput === "") return;
		console.log(id)
		axios.post("http://localhost:3001/comments",{
			commentBody: commentInput,
			RecipeId: id
		}, {
			headers: {
				accessToken: localStorage.getItem("accessToken")
			},
		}).then(res => {
			if (res.data.error)
				console.log(res.data.error)
			else {
				console.log(res.data)
				const addedCommentTime = new Date();
				const newComment = {
					commentBody: commentInput,
					createdAt: addedCommentTime,
					updatedAt: addedCommentTime,
					username: res.data.username,
				};
				setCommentsData([...commentsData, newComment]);
				setCommentInput("");
			}
		})
	}

	const handleDeleteComment = (commentId) => {
		axios.delete(`http://localhost:3001/comments/${commentId}`, {
			headers: {
				accessToken: localStorage.getItem("accessToken")
			}
		}).then((res) => {
			setCommentsData(commentsData.filter(val => val.id !== commentId));
		});

	};

	// Fetch data from database
	useEffect(() => {
		axios.get(`http://localhost:3001/recipes/${id}`).then((res) => {
			setRecipeData(res.data);
			setRecipeCreatedDate(new Date(res.data.createdAt));
		});
		axios.get(`http://localhost:3001/comments/${id}`).then((res) =>{
			if (res.data.error) return;
			setCommentsData(res.data);
        })
		axios.get(`http://localhost:3001/tags/${id}`).then((res) => {
			if (res.data.error) return;
			console.log(res.data);
			setUserTagsData(res.data);
		})
	}, []);

	// Setup page variables
	useEffect(() => {
		setPageUrl(window.location.href);
		setSidebarVisible(false);
		return () => {
			setSidebarVisible(true);
		};
	})

	return (
		<div className={style.container}>
			<div className={style.recipeContainer}>
				<div className={style.recipePanel}>
					<RecipeCard recipeData={recipeData}/>
				</div>
			</div>
			<div className={style.sidebarContainer}>
				<RecipeInfo recipeData={recipeData}
							userTags={userTagsData}
				            date={recipeCreatedDate}
				            pageUrl={pageUrl}
				/>
				<div className={style.commentsSection}>
					{commentsData.map((comment, id) => {
						return <CommentCard key={id} content={comment} handleDelete={handleDeleteComment}/>;
					})}
				</div>
				<div className={style.addComment}>
					<input type="text" placeholder="Input your comment"
					       value={commentInput}
					       onChange={e => setCommentInput(e.target.value)}/>
					<button onClick={handleSubmitComment}>Submit</button>
				</div>
			</div>
		</div>
	);
};

export default Recipe;