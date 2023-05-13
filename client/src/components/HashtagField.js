import React, {useRef, useState} from 'react';
import useKeyListener from '../helpers/useKeyListener';
import style from '../styles/components/HashtagField.module.css';

const HashtagField = ({hashtags, handleAddHashtag, handleDeleteHashtag, placeholder}) => {
	const [newHashtag, setNewHashtag] = useState('');

	const hashtagInputRef = useRef(null);

	const handleAddTagEventPressed = () => {
		if (document.activeElement !== hashtagInputRef.current) return;
		if (!newHashtag) return;
		handleAddHashtag(newHashtag);
		setNewHashtag("");
	}

	const handleDeleteTagEventPressed = () => {
		if (document.activeElement !== hashtagInputRef.current) return;
        if (newHashtag !== "") return;
        handleDeleteHashtag(hashtags.length - 1);
	}

	const handleSpaceBarPressed = (e) => {
		if (newHashtag!== "" || document.activeElement !== hashtagInputRef.current) return;
		e.preventDefault();
	}

	useKeyListener("Comma", handleAddTagEventPressed);
	useKeyListener("Comma", (e) => handleSpaceBarPressed(e));
	useKeyListener("Enter", handleAddTagEventPressed);
	useKeyListener("Backspace", handleDeleteTagEventPressed);
	useKeyListener("Space", (e) => handleSpaceBarPressed(e));

	return (
		<div className={style.container}>
			<div className={style.inputContainer}>
				{hashtags?.map((hashtag, index) => {
					return (
						<div className={style.hashtag} key={index}
						     onClick={() => handleDeleteHashtag(index)}>
							<span>{hashtag}</span>
						</div>
					)
				})}
				<input type="text" value={newHashtag} ref={hashtagInputRef}
				       onChange={(e) =>
					       setNewHashtag(e.target.value)} placeholder={hashtags.length <= 0 && placeholder}/>
			</div>
		</div>
	);
};

export default HashtagField;