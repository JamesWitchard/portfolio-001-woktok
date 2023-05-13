import React, {useState} from "react";
import ReactTimeAgo from "react-time-ago";
import BlankUser from "./BlankUser";
import style from "../styles/components/RecipeInfo.module.css";

const RecipeInfo = ({recipeData, userTags, date, pageUrl}) => {
	const [serverTags, setServerTags] = useState(['Example', 'Viral']);

	const handleCopyToClipboard = () => {
		try{
			navigator.clipboard.writeText(pageUrl).then(r => console.log("Text Copied"));
		} catch (err) {
			console.log(err)
		}
	}

	return <div className={style.container}>
		<div className={style.authorInfo}>
			<div className={style.profilePic}>
				<BlankUser/>
			</div>
			<div className={style.author}>
				<span className={style.authorUsername}>{recipeData.author}</span>
				<div className={style.authorProfile}>
					<span className={style.authorName}>Real Name</span>
					·
					<ReactTimeAgo date={date} timeStyle={"mini"}/>
				</div>
			</div>
			<button>Follow</button>
		</div>
		<div className={style.descriptionSection}>
						<span className={style.description}>
							{recipeData.descriptionText ? recipeData.descriptionText :
								"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, unde! " +
								"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab repellat soluta velit. " +
								"Inventore, iure totam."}

						</span>
			<div className={style.hashtagContainer}>
				{serverTags.map((tag, index) => {
					return <span className={style.important}
					             key={`serverTag-${index}`}>
						{tag}
					</span>
				})}
				{ userTags.length > 0 ? userTags.map((userTag, index) => {
					return <span key={`userTag-${index}`}>
						{userTag.tag}
					</span>
				}) :
				<span className={style.noTags}>{"No user tags."}</span> }
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
	</div>;
}

export default RecipeInfo;