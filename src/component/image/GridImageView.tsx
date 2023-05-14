/* eslint-disable react-native/no-inline-styles */
import { incrementImageAction } from 'action/appAction';
import { Screens } from 'common';
import { colors, Navigator, screenWidth, sizes } from 'core/index';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { countImageHomeSelector } from 'selector/appSelector';
import { imageSource } from 'utils';
import { keyInterstitialOpenImage, keyInterstitialOpenImageHigh } from 'utils/GoogleAds';
const numColumns = 3;
const imageWidth = (screenWidth - sizes.s4) / numColumns;

interface Props {
	data: any;
	onPress?: any;
}

const GridImageView: React.FC<Props> = ({ data, onPress }) => {
	const count = useSelector(countImageHomeSelector);
	const dispatch = useDispatch();

	const detailScreen = (item: any, index: number) => {
		dispatch(incrementImageAction());
		Navigator.navigate(Screens.Detail, { data: data, index });
		if (count % 2 !== 0) {
			Navigator.navigate(Screens.GoogleInterstitialsAds, {
				key: keyInterstitialOpenImageHigh,
				key2: keyInterstitialOpenImage,
				type: 'image_high',
			});
			return;
		}
	};
	const renderItem = ({ item, index }: any) => {
		return (
			<View style={{ flex: index === data.length - 1 ? numColumns - 1 : 1 }}>
				<TouchableOpacity
					onPress={() => (onPress ? onPress?.(item) : detailScreen(item, index))}
					activeOpacity={0.8}>
					<FastImage style={styles.image} source={imageSource(item)} />
				</TouchableOpacity>
			</View>
		);
	};

	const keyExtractor = (item: any, index: number) => index.toString();

	return (
		<FlatList
			data={data}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			numColumns={numColumns}
			style={styles.container}
		/>
	);
};

export default GridImageView;

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
