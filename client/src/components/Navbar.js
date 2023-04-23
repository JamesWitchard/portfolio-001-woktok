import React from 'react';
import {Link} from "react-router-dom";
import "./Navbar.styles.css"

const Navbar = () => {
	return (
		<div className="navbarContainer">
			<Link to="/">Home Page</Link>
			<Link to="/add-recipe">Add a Recipe</Link>
			<Link to="/login">Login</Link>
			<Link to="/registration">Registration</Link>
		</div>
	);
};

export default Navbar;