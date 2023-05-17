import { dataDetailCategory } from 'common/data';
import { GridImageView } from 'component';
import { colors, fonts, sizes } from 'core/index';
import { TabScreenProps } from 'model';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

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
const styles = StyleSheet.create({
	viewBanner: {
		alignItems: 'center',
		backgroundColor: colors.background_black,
	},
});
