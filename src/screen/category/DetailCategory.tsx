/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */

import { images } from 'assets';
import { Screens } from 'common';
import { dataDetailCategory } from 'common/data';
import { Flex, NavigationButton } from 'component';
import { colors, screenWidth, sizes } from 'core/index';
import { ScreenProps } from 'model';
import React, { useLayoutEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
const numColumns = 3;
const imageWidth = (screenWidth - sizes.s4) / numColumns;

const DetailCategory: React.FC<ScreenProps> = ({ navigation, route }) => {
	const cateogry: any = route?.params || {};

	const iniScreen = () => {
		navigation.setOptions({
			headerShown: true,
			title: cateogry.title,
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
	const detailScreen = () => {
		navigation.navigate(Screens.Detail);
	};
	const renderItem = ({ item, index }: any) => {
		return (
			<TouchableOpacity
				style={{ flex: index === dataDetailCategory.length - 1 ? numColumns - 1 : 1 }}
				onPress={detailScreen}
				activeOpacity={0.8}>
				<FastImage style={styles.image} source={item.background} />
			</TouchableOpacity>
		);
	};

	const keyExtractor = (item: any, index: number) => index.toString();

	return (
		<Flex style={styles.container}>
			<FlatList
				data={dataDetailCategory}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				numColumns={numColumns}
				style={styles.container}
			/>
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
	image: {
		width: imageWidth,
		height: (imageWidth / 9) * 16,
		marginBottom: sizes.s2,
	},
});
