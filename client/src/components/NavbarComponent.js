import React from 'react';
import {Link} from "react-router-dom";
import style from "../styles/components/NavbarComponent.module.css"

const NavbarComponent = () => {
	return (
		<div className={style.container}>
			<Link to="/">Home Page</Link>
			<Link to="/add-recipe">Add a Recipe</Link>
			<Link to="/login">Login</Link>
			<Link to="/registration">Registration</Link>
		</div>
	);
};

export default NavbarComponent;