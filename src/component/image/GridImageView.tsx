/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import remoteConfig from '@react-native-firebase/remote-config';
import { useHeaderHeight } from '@react-navigation/elements';
import { incrementImageAction } from 'action/appAction';
import { Screens } from 'common';
import { colors, Navigator, sizes } from 'core/index';
import { throttle } from 'lodash';
import { ScreenProps, TabScreenProps } from 'model';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, PixelRatio, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { countImageHomeSelector } from 'selector/appSelector';
import { keyInterstitialOpenImage, keyInterstitialOpenImageHigh } from 'utils/GoogleAds';
import ItemImage from './ItemImage';
import FastImage from 'react-native-fast-image';
import { IMAGE_URL } from 'utils/Https';

const numColumns = 3;

interface Props {
	data: WallpaperType[];
	onPress?: any;
	onEndReached?: any;
	navigation?: ScreenProps['navigation'] | TabScreenProps['navigation'];
}

const GridImageView: React.FC<Props> = ({ data, onEndReached = () => {}, navigation }) => {
	const yOffset = useRef(new Animated.Value(0)).current;
	const headerOpacity = yOffset.interpolate({
		inputRange: [0, 200],
		outputRange: [1, 0.7],
		extrapolate: 'clamp',
	});
	const headerHeight = useHeaderHeight();
	const [hideAds1, setHideAds1] = useState<boolean>(false);
	const [hideAds2, setHideAds2] = useState<boolean>(false);
	const count = useSelector(countImageHomeSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		if (navigation) {
			navigation.setOptions({
				headerStyle: {
					// opacity: headerOpacity,
					backgroundColor: colors.backgroundApp,
				},
				headerBackground: () => (
					<Animated.View
						style={{
							backgroundColor: colors.backgroundApp,
							...StyleSheet.absoluteFillObject,
							// opacity: headerOpacity,
						}}
					/>
				),
				headerTransparent: true,
			});
		}
		getConfigRemote();
	}, [headerOpacity, navigation]);

	const getConfigRemote = () => {
		remoteConfig()
			.setDefaults({
				inter_open_image_high: false,
				inter_open_image: false,
			})
			.then(() => remoteConfig()?.fetch(0))
			.then(() => remoteConfig()?.fetchAndActivate());
		const ads1: any = remoteConfig()?.getValue('inter_open_image_high').asBoolean();
		const ads2: any = remoteConfig()?.getValue('inter_open_image').asBoolean();

		setHideAds1(ads1);
		setHideAds2(ads2);
	};
	const detailScreen = (index: number) => {
		dispatch(incrementImageAction());
		Navigator.navigate(Screens.Detail, { data: data, index });
		if (count % 3 === 0) {
			if (hideAds1) {
				Navigator.navigate(Screens.GoogleInterstitialsAds, {
					key: keyInterstitialOpenImageHigh,
					type: 'image_high',
					goBack: true,
				});
				return;
			}
			if (hideAds2) {
				Navigator.navigate(Screens.GoogleInterstitialsAds, {
					key: keyInterstitialOpenImage,
					type: 'image_high',
					goBack: true,
				});
				return;
			}
		}
	};

	const renderItem = ({ item, index }: { item: WallpaperType; index: number }) => {
		let url = '';
		const pixelRatio = PixelRatio.get();
		if (pixelRatio < 2) {
			url += item?.media?.formats?.small?.url || item?.media?.formats?.thumbnail?.url;
		} else if (pixelRatio < 3) {
			url += item?.media?.formats?.medium?.url || item?.media?.formats?.thumbnail?.url;
		} else {
			url += item?.media?.formats?.large?.url || item?.media?.formats?.thumbnail?.url;
		}

		return (
			<ItemImage
				url={url}
				onPress={() => {
					FastImage?.preload([
						{
							uri: IMAGE_URL + item?.media?.url,
						},
					]);
					detailScreen(index);
				}}
			/>
		);
	};

	const keyExtractor = (item: any) => String(item?.id);

	return (
		<Animated.FlatList
			data={data}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			numColumns={numColumns}
			style={[styles.container]}
			contentContainerStyle={{ flexGrow: 1, paddingTop: navigation ? headerHeight : 0 }}
			onEndReached={throttle(onEndReached, 1000)}
			onEndReachedThreshold={0.5}
			ListFooterComponent={
				<View style={{ marginVertical: sizes.s8, alignItems: 'center' }}>
					<ActivityIndicator color={colors.blue} size="small" />
				</View>
			}
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
});
