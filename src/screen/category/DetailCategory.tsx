/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */

import { images } from 'assets';
import { dataDetailCategory } from 'common/data';
import { Flex, GridImageView, NavigationButton } from 'component';
import { colors, screenWidth, sizes } from 'core/index';
import { ScreenProps } from 'model';
import React, { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';

const DetailCategory: React.FC<ScreenProps> = ({ navigation, route }) => {
	const cateogry: any = route?.params || {};

	const iniScreen = () => {
		navigation.setOptions({
			headerShown: true,
			title: cateogry?.title,
			headerLeft: () => (
				<NavigationButton
					icon={images.ic_back_arrow}
					tintColor="white"
					onPress={() => navigation.goBack()}
					style={styles.iconHeader}
				/>
			),

			headerTitleAlign: 'center',
			headerShadowVisible: false,
			headerTitleStyle: {
				color: colors.white,
			},
			headerStyle: {
				backgroundColor: colors.background_black,
			},
		});
	};
	useLayoutEffect(() => {
		iniScreen();
	}, []);

	return (
		<Flex style={styles.container}>
			<GridImageView data={dataDetailCategory} />
		</Flex>
	);
};

export default DetailCategory;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background_black,
	},
	iconHeader: {
		width: sizes.s24,
		height: sizes.s24,
		marginLeft: sizes.s16,
	},
});
