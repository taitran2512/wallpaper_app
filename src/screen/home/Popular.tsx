/* eslint-disable react-hooks/exhaustive-deps */
import { dataDetailCategory } from 'common/data';
import { GridImageView } from 'component';
import { fonts, sizes } from 'core/index';
import { TabScreenProps } from 'model';
import React, { useEffect } from 'react';

const Popular = ({ navigation }: TabScreenProps) => {
	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			title: 'Popular',
			headerLeft: undefined,
			headerTitleStyle: {
				color: 'white',
				fontFamily: fonts.bold,
				fontSize: sizes.s18,
			},
		});
	}, []);

	return <GridImageView data={dataDetailCategory} />;
};

export default Popular;
