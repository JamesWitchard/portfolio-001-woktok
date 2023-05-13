import React from 'react';
import style from '../styles/components/FloatingContainer.module.css';

const FloatingContainer = ({children, isOpen, direction = ''}) => {

	const resolveDirection = (direction) => {
		switch (direction) {
			case 'left':
				return style.left;
			case 'right':
				return style.right;
			case 'up':
				return style.up;
			case 'down':
				return style.down;
			default:
				return style.down;
		}
	}
	return (
		<>
			{ isOpen &&
				<div className={`${style.container} ${resolveDirection(direction)}`}>
					{children}
				</div>
			}
		</>
	);
};

export default FloatingContainer;