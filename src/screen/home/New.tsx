import { StyleSheet, FlatList, Text, View } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { colors, screenWidth, sizes } from 'core/index';
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
	const renderItem = ({ item, index }: any) => {
		return (
			<View style={{ flex: index === images.length - 1 ? numColumns - 1 : 1 }}>
				<FastImage style={styles.image} source={item} />
			</View>
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
