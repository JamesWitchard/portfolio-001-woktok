import React from 'react';
import ReactTimeAgo from "react-time-ago";
import style from "../styles/components/CommentCard.module.css"
import BlankUser from "./BlankUser";
import {useContext} from "react";
import {AuthContext} from "../helpers/AuthContext";

const CommentCard = ({content, handleDelete}) => {

	const {authState, setAuthState} = useContext(AuthContext)


	return (
		<div className={style.container}>
			<div className={style.profilePicContainer}>
				<div className={style.profilePic}>
					<BlankUser/>
				</div>
			</div>
			<div className={style.contentContainer}>
				<span className={style.username}>
					{content.username}
				</span>
				<span className={style.commentBody}>
					{content.commentBody}
				</span>
				<div className={style.controls}>
					<ReactTimeAgo date={new Date(content.createdAt)} timeStyle={"mini"}/>
					<a href="#">Reply</a>
				</div>
			</div>
			<div className={style.likeContainer}>
				3
				{
					authState.username === content.username &&
					<button onClick={() => handleDelete(content.id)}>x</button>
				}
			</div>
		</div>
	);
};

export default CommentCard;