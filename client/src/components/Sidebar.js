import React, {useContext, useState} from 'react';
import {AuthContext} from "../helpers/AuthContext";
import style from '../styles/components/Sidebar.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import {
	HomeOutlined,
	HomeRounded,
	People,
	PeopleOutline,
	VideocamRounded,
	VideocamOutlined,
	Close
} from "@mui/icons-material";

const Sidebar = () => {
	const [seeMoreAccounts, setSeeMoreAccounts] = useState(false);
	const {sidebarVisible, authState} = useContext(AuthContext);

	const navigate = useNavigate();
	const iconSize = "large";
	const navbarLinks = [{
		title: "Home",
		to: "/",
		activeIcon: (isActive) => <HomeRounded className={isActive && style.active} fontSize={iconSize}/>,
		inactiveIcon: (isActive) => <HomeOutlined className={isActive && style.active} fontSize={iconSize}/>,
	}, {
		title: "Following",
		to: "/following",
		activeIcon: (isActive) => <People className={isActive && style.active} fontSize={iconSize}/>,
		inactiveIcon: (isActive) => <PeopleOutline className={isActive && style.active} fontSize={iconSize}/>,
	}, {
		title: "Live",
		to: "/live",
		activeIcon: (isActive) => <VideocamRounded className={isActive && style.active} fontSize={iconSize}/>,
		inactiveIcon: (isActive) => <VideocamOutlined className={isActive && style.active} fontSize={iconSize}/>
	}];


	const handleClick = () => {
		navigate(-1);
	}

	return (
		<>
			{sidebarVisible ?
				<div className={style.container}>
					<div className={style.sidebarContainer}>
						<div className={style.navLinksContainer}>
							{navbarLinks.map((link, index) => {
								return <NavLink className={style.sidebarMenuItem} key={index} to={link.to} end>
									{({isActive}) =>
										<>
											{isActive ?
												link.activeIcon(isActive) :
												link.inactiveIcon(isActive)
											}
											<span className={isActive && style.active}>{link.title}</span>
										</>
									}
								</NavLink>
							})}
						</div>
						{/*DONE: Add conditional for if logged in or not*/}
						{!authState.status &&
							<div className={style.loginContainer}>
								<span>Log in to follow authors, like recipes and post comments.</span>
								<button onClick={() => navigate('/login')}>Log in</button>
							</div>
						}
						<div className={style.suggestedAccountsContainer}>
							<h4>Suggested accounts</h4>
							<button
							   className={style.accountVisibility}
							   onClick={() => setSeeMoreAccounts(prevState => !prevState)}
							>
								{!seeMoreAccounts ? "See all" : "See less"}
							</button>
						</div>
					</div>
				</div> :
				<div className={style.closeIcon} onClick={handleClick}>
					<Close fontSize={iconSize}/>
				</div>
			}
		</>
	);
};

export default Sidebar;