import React from 'react';
import style from "../styles/components/BlankUser.module.css"

const BlankUser = () => {
	return (
		<div className={style.container}>
			<div className={style.head}/>
			<div className={style.body}/>
			<div className={style.background}/>
		</div>
	);
};

export default BlankUser;