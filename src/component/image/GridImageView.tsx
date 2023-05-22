/* eslint-disable react-native/no-inline-styles */
import { useHeaderHeight } from '@react-navigation/elements';
import { incrementImageAction } from 'action/appAction';
import { Screens } from 'common';
import { colors, Navigator, screenWidth, sizes } from 'core/index';
import { ScreenProps, TabScreenProps } from 'model';
import React, { useEffect, useRef } from 'react';
import { Animated, PixelRatio, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { countImageHomeSelector } from 'selector/appSelector';
import { imageSource } from 'utils';
import { keyInterstitialOpenImage, keyInterstitialOpenImageHigh } from 'utils/GoogleAds';
import { IMAGE_URL } from 'utils/Https';

const numColumns = 3;
const imageWidth = (screenWidth - sizes.s4) / numColumns;

interface Props {
	data: WallpaperType[];
	onPress?: any;
	onEndReached?: any;
	navigation?: ScreenProps['navigation'] | TabScreenProps['navigation'];
}

const GridImageView: React.FC<Props> = ({ data, onPress, onEndReached, navigation }) => {
	const yOffset = useRef(new Animated.Value(0)).current;
	const headerOpacity = yOffset.interpolate({
		inputRange: [0, 200],
		outputRange: [1, 0.7],
		extrapolate: 'clamp',
	});
	const headerHeight = useHeaderHeight();

	const count = useSelector(countImageHomeSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		if (navigation) {
			navigation.setOptions({
				headerStyle: {
					opacity: headerOpacity,
					backgroundColor: colors.backgroundApp,
				},
				headerBackground: () => (
					<Animated.View
						style={{
							backgroundColor: colors.backgroundApp,
							...StyleSheet.absoluteFillObject,
							opacity: headerOpacity,
						}}
					/>
				),
				headerTransparent: true,
			});
		}
	}, [headerOpacity, navigation]);

	const detailScreen = (index: number) => {
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

	const renderItem = ({ item, index }: { item: WallpaperType; index: number }) => {
		let url = IMAGE_URL;
		const pixelRatio = PixelRatio.get();
		if (pixelRatio < 2) {
			url += item?.media?.formats?.small?.url || item?.media?.formats?.thumbnail?.url;
		} else if (pixelRatio < 3) {
			url += item?.media?.formats?.medium?.url || item?.media?.formats?.thumbnail?.url;
		} else {
			url += item?.media?.formats?.large?.url || item?.media?.formats?.thumbnail?.url;
		}
		return (
			<View
				style={{
					flex: 1 / numColumns,
				}}>
				<TouchableOpacity
					onPress={() =>
						onPress ? onPress?.(IMAGE_URL + item?.media?.url) : detailScreen(index)
					}
					activeOpacity={0.8}>
					<FastImage style={styles.image} source={imageSource(url)} />
				</TouchableOpacity>
			</View>
		);
	};

	const keyExtractor = (item: any, index: number) => index.toString();

	return (
		<Animated.FlatList
			data={data}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			numColumns={numColumns}
			style={[styles.container]}
			contentContainerStyle={{ flexGrow: 1, paddingTop: navigation ? headerHeight : 0 }}
			onEndReached={onEndReached}
			onEndReachedThreshold={1.5}
			initialNumToRender={20}
			onScroll={Animated.event(
				[
					{
						nativeEvent: {
							contentOffset: {
								y: yOffset,
							},
						},
					},
				],
				{ useNativeDriver: true }
			)}
			scrollEventThrottle={16}
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
