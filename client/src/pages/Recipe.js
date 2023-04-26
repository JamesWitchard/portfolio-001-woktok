import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import style from "../styles/pages/Recipe.module.css";
import CommentCard from "../components/CommentCard";
import ReactTimeAgo from "react-time-ago";
import BlankUser from "../components/BlankUser";

const Recipe= () => {
	const [recipeData, setRecipeData] = useState({});
	const [recipeCreatedDate, setRecipeCreatedDate] = useState(new Date());
	const [commentsData, setCommentsData] = useState([])
	const [pageUrl, setPageUrl] = useState("");
	const [commentInput, setCommentInput] = useState("")

	let {id} = useParams();

	// Button handlers
	const handleCopyToClipboard = () => {
		try{
			navigator.clipboard.writeText(pageUrl).then(r => console.log("Text Copied"));
		} catch (err) {
			console.log(err)
		}
	}

	const handleSubmitComment = () => {
		if (commentInput === "") return;

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

	// Fetch data from database
	useEffect(() => {
		axios.get(`http://localhost:3001/recipes/${id}`).then((res) => {
			setRecipeData(res.data);
			setRecipeCreatedDate(new Date(res.data.createdAt));
		});
		axios.get(`http://localhost:3001/comments/${id}`).then((res) =>{
			setCommentsData(res.data);
		})
	}, []);

	// Setup page variables
	useEffect(() => {
		setPageUrl(window.location.href);
	})

	return (
		<div className={style.container}>
			<div className={style.recipeContainer}>
				<div className={style.recipePanel}>
					<RecipeCard recipeData={recipeData}/>
				</div>
			</div>
			<div className={style.sidebarContainer}>
				<div className={style.postInfo}>
					<div className={style.authorInfo}>
						<div className={style.profilePic}>
							<BlankUser />
						</div>
						<div className={style.author}>
							<span className={style.authorUsername}>{recipeData.author}</span>
							<div className={style.authorProfile}>
								<span className={style.authorName}>Real Name</span>
								·
								<ReactTimeAgo date={recipeCreatedDate} timeStyle={"mini"} />
							</div>
						</div>
						<button>Follow</button>
					</div>
					<div className={style.descriptionSection}>
						<span className={style.description}>
							{recipeData.descriptionText ? recipeData.descriptionText :
								"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, unde! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab repellat soluta velit. Inventore, iure totam."}

						</span>
						<div className={style.hashtags}>
							<span className={style.important}>Example</span>
							<span className={style.important}>Viral</span>
							<span>Steak</span>
							<span>Kidney</span>
							<span>dinner</span>
							<span>meal</span>
						</div>
					</div>
					<div className={style.shareSection}>
						<div className={style.embeds}>
							<div className={style.stats}>
								<button>Likes</button>
								<button>Comments</button>
							</div>
							<div className={style.sharing}>
								<button>Embed</button>
								<button>Friends</button>
								<button>WhatsApp</button>
								<button>FaceBook</button>
								<button>Twitter</button>
								<button>Other</button>
							</div>
						</div>
						<div className={style.copyLink}>
							<span>{pageUrl}</span>
							<button onClick={handleCopyToClipboard}>Copy Link</button>
						</div>
					</div>
				</div>
				<div className={style.commentsSection}>
					{commentsData.map((comment, id) => {
						return <CommentCard key={id} content={comment}/>;
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