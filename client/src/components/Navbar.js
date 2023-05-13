import React, {useContext, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import style from "../styles/components/Navbar.module.css"
import {AuthContext} from "../helpers/AuthContext";
import BlankUser from "./BlankUser";
import FloatingContainer from "./FloatingContainer";
import {Logout, Person, Settings} from "@mui/icons-material";

const Navbar = () => {
	const [openDropdown, setOpenDropdown] = useState(false)
	const {authState, setAuthState} = useContext(AuthContext)
	const dropDownTriggerRef = useRef();
	const dropDownRef = useRef();
	const navigate = useNavigate();
	let timeoutId;

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		setAuthState({
			username: "",
			id: 0,
			status: false
		});
	}
	const handleMouseOver = (e, interval) => {
		if (e.type === "mouseleave") {
			timeoutId = setTimeout(() => {
				setOpenDropdown(false);
			}, interval);
		} else if (e.type === "mouseenter") {
			setOpenDropdown(true);
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		}
	}

	return (
		<div className={style.container}>
			<Link to="/">Home Page</Link>
			<Link to="/add-recipe">Add a Recipe</Link>
			{!authState.status ? (
				<>
					<Link to="/login">Login</Link>
					<Link to="/registration">Registration</Link>
				</>
			) : (
				<>
					<div className={style.user}
					     onMouseEnter={(e) => handleMouseOver(e, 600)}
					     onMouseLeave={(e) => handleMouseOver(e, 600)}
					     ref={dropDownTriggerRef}>
						<BlankUser/>
						<FloatingContainer isOpen={ openDropdown } ref={dropDownRef} direction='down'>
							<span className={style.welcomeMessage}>Welcome,<b>{authState.username}</b>!</span>
							<div className={style.userMenuItem} onClick={() => navigate(`/profile/${authState.id}`)}>
								<Person fontSize="small"/><span>Profile</span>
							</div>
							<div className={style.userMenuItem}>
								<Settings fontSize="small"/><span>Settings</span>
							</div>
							<div className={style.userMenuItem} onClick={handleLogout}>
								<Logout fontSize="small"/><span className={style.logout} >Logout</span>
							</div>
						</FloatingContainer>
					</div>

				</>
			)}
		</div>
	);
};

export default Navbar;