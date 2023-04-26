/* eslint-disable react-native/no-inline-styles */
import { Screens } from 'common';
import { dataDetailCategory } from 'common/data';
import { colors, Navigator, screenWidth, sizes } from 'core/index';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
const numColumns = 3;
const imageWidth = (screenWidth - sizes.s4) / numColumns;

const Popular = () => {
	const detailScreen = () => {
		Navigator.navigate(Screens.Detail);
	};
	const renderItem = ({ item, index }: any) => {
		return (
			<TouchableOpacity
				onPress={detailScreen}
				activeOpacity={0.8}
				style={{ flex: index === dataDetailCategory.length - 1 ? numColumns - 1 : 1 }}>
				<FastImage style={styles.image} source={item.background} />
			</TouchableOpacity>
		);
	};

	const keyExtractor = (item: any, index: number) => index.toString();

	return (
		<FlatList
			data={dataDetailCategory}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			numColumns={numColumns}
			style={styles.container}
		/>
	);
};

export default Popular;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background_black,
	},
	image: {
		width: imageWidth,
		height: (imageWidth / 9) * 16,
		marginBottom: sizes.s2,
	},
});
