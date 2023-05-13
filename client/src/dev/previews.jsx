import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import Navbar from "../components/Navbar";
import Home from "../pages/Home";

const ComponentPreviews = () => {
	return (
		<Previews palette={<PaletteTree/>}>
			<ComponentPreview path="/Navbar">
				<Navbar/>
			</ComponentPreview>
			<ComponentPreview path="/Home">
				<Home/>
			</ComponentPreview>
		</Previews>
	);
};

export default ComponentPreviews;