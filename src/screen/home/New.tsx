import { images } from 'assets';
import { GridImageView } from 'component';
import React from 'react';

const DATA = [
	images.banner,
	images.banner,
	images.banner,
	images.banner,
	images.banner,
	images.banner,
	images.banner,
	images.banner,
];
const New = () => {
	return <GridImageView data={DATA} />;
};

export default New;
