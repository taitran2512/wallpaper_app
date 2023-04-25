import { Screens } from 'common';
import { colors, Navigator, screenWidth, sizes } from 'core/index';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
const numColumns = 3;
const imageWidth = (screenWidth - sizes.s4) / numColumns;

const images = [
	{ uri: 'https://i.pinimg.com/474x/b2/60/2a/b2602abcc595143c9227610be430cfb6.jpg' },
	{ uri: 'https://i.pinimg.com/474x/b2/60/2a/b2602abcc595143c9227610be430cfb6.jpg' },
	{ uri: 'https://i.pinimg.com/474x/b2/60/2a/b2602abcc595143c9227610be430cfb6.jpg' },
	{ uri: 'https://i.pinimg.com/474x/b2/60/2a/b2602abcc595143c9227610be430cfb6.jpg' },
	{ uri: 'https://i.pinimg.com/474x/b2/60/2a/b2602abcc595143c9227610be430cfb6.jpg' },
	{ uri: 'https://i.pinimg.com/474x/b2/60/2a/b2602abcc595143c9227610be430cfb6.jpg' },
	{ uri: 'https://i.pinimg.com/474x/b2/60/2a/b2602abcc595143c9227610be430cfb6.jpg' },
	{ uri: 'https://i.pinimg.com/474x/b2/60/2a/b2602abcc595143c9227610be430cfb6.jpg' },
];
const New = () => {
	const detailScreen = () => {
		Navigator.navigate(Screens.Detail);
	};
	const renderItem = ({ item, index }: any) => {
		return (
			<TouchableOpacity onPress={detailScreen} activeOpacity={0.8}>
				<View style={{ flex: index === images.length - 1 ? numColumns - 1 : 1 }}>
					<FastImage style={styles.image} source={item} />
				</View>
			</TouchableOpacity>
		);
	};

	const keyExtractor = (item: any, index: number) => index.toString();

	return (
		<FlatList
			data={images}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			numColumns={numColumns}
			style={styles.container}
		/>
	);
};

export default New;

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
