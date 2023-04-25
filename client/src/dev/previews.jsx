import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import NavbarComponent from "../components/NavbarComponent";
import Home from "../pages/Home";

const ComponentPreviews = () => {
	return (
		<Previews palette={<PaletteTree/>}>
			<ComponentPreview path="/NavbarComponent">
				<NavbarComponent/>
			</ComponentPreview>
			<ComponentPreview path="/Home">
				<Home/>
			</ComponentPreview>
		</Previews>
	);
};

export default ComponentPreviews;