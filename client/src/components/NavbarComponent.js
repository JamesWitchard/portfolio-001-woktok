import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import style from "../styles/components/NavbarComponent.module.css"
import {AuthContext} from "../helpers/AuthContext";

const NavbarComponent = () => {
	const {authState, setAuthState} = useContext(AuthContext)

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		setAuthState(false);
	}
	return (
		<div className={style.container}>
			<Link to="/">Home Page</Link>
			<Link to="/add-recipe">Add a Recipe</Link>
			{ !authState ? (
				<>
					<Link to="/login">Login</Link>
					<Link to="/registration">Registration</Link>
				</>
			) : (
				<span className={style.logout} onClick={handleLogout}>Logout</span>
			)}
		</div>
	);
};

export default NavbarComponent;