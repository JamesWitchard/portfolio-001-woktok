import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import "./Recipe.stlyes.css";

const Recipe= () => {
	const [recipeData, setRecipeData] = useState({});
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
		}).then(res => {
			const newComment = {commentBody: commentInput}
			setCommentsData([...commentsData, newComment]);
			setCommentInput("");
		})
	}

	useEffect(() => {
		console.log(commentInput)
	}, [commentInput]);

	// Fetch data from database
	useEffect(() => {
		axios.get(`http://localhost:3001/recipes/${id}`).then((res) => {
			setRecipeData(res.data);
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
		<div className="contentContainer">
			<div className="recipePanel">
				<div className="recipeContainer">
					<div className="dishContainer">
						<h1>{recipeData.dish}</h1>
					</div>
					<div className="directionsContainer">
						<ol>
							{recipeData.directions?.map((step, ind) => {
								return <li key={ind}>{step}</li>;
							})}
						</ol>
					</div>
					<div className="redLine"/>
					<div className="footerContainer">{recipeData.author}</div>
				</div>
			</div>
			<div className="sidebarContainer">
				<div className="postInfo">
					<div className="authorInfo">
						<div className="profilePic"/>
						<div className="author">
							<span className="authorUsername">{recipeData.author}</span>
							<div className="authorProfile">
								<span className="authorName">Real Name</span>
								·
								<span className="lastOnline">2d ago</span>
							</div>
						</div>
						<button>Follow</button>
					</div>
					<div className="descriptionSection">
						<span className="description">
							{recipeData.descriptionText ? recipeData.descriptionText :
								"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, unde! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab repellat soluta velit. Inventore, iure totam."}

						</span>
						<div className="hashtags">
							<span className="important">Example</span>
							<span className="important">Viral</span>
							<span>Steak</span>
							<span>Kidney</span>
							<span>dinner</span>
							<span>meal</span>
						</div>
					</div>
					<div className="shareSection">
						<div className="embeds">
							<div className="stats">
								<button>Likes</button>
								<button>Comments</button>
							</div>
							<div className="sharing">
								<button>Embed</button>
								<button>Friends</button>
								<button>WhatsApp</button>
								<button>FaceBook</button>
								<button>Twitter</button>
								<button>Other</button>
							</div>
						</div>
						<div className="copyLink">
							<span>{pageUrl}</span>
							<button onClick={handleCopyToClipboard}>Copy Link</button>
						</div>
					</div>
				</div>
				<div className="commentsSection">
					<ul>
						{commentsData.map((comment, id) => {
							return <li key={id}>{comment.commentBody}</li>;
						})}
					</ul>
				</div>
				<div className="addComment">
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