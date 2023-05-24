/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import remoteConfig from '@react-native-firebase/remote-config';

import WallpaperApi from 'api/WallpaperApi';
import { images } from 'assets';
import { Flex, GridImageView, NavigationButton, Skeleton } from 'component';
import { colors, fonts, sizes } from 'core/index';
import { isEmpty } from 'lodash';
import { ScreenProps, TabScreenProps } from 'model';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { keyBanner_category } from 'utils/GoogleAds';

const DetailCategory: React.FC<ScreenProps | TabScreenProps> = ({ navigation, route }) => {
	const { categoryName }: any = route?.params || {};
	const [loading, setLoading] = useState<boolean>(true);
	const [data, setData] = useState<WallpaperType[]>([]);
	const page = useRef<number>(0);
	const [hideBanner, setHideBanner] = useState<boolean>(false);

	const iniScreen = () => {
		if (categoryName) {
			navigation.setOptions({
				headerShown: true,
				title: categoryName,
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
		} else {
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
		}
	};

	const getConfigRemote = () => {
		remoteConfig()
			.setDefaults({
				banner_category: false,
			})
			.then(() => remoteConfig()?.fetch(0))
			.then(() => remoteConfig()?.fetchAndActivate());
		const banner: any = remoteConfig()?.getValue('banner_category').asBoolean();
		setHideBanner(banner);
	};

	const getData = async () => {
		try {
			page.current += 1;
			const response = await WallpaperApi.getListWallpaperByCategory(categoryName, page.current);
			const newData = [...data, ...response?.data].filter((e) => !isEmpty(e.media));
			setData([...newData]);
			// if (response?.meta?.pagination?.page === response.meta?.pagination?.pageCount) {
			// 	page.current = -1;
			// }
		} catch (error) {}
	};

	useLayoutEffect(() => {
		iniScreen();
		getData();
		getConfigRemote();
	}, []);

	return (
		<Flex style={styles.container}>
			<GridImageView
				data={data}
				onEndReached={() => {
					// get full data, no more can get
					if (page.current === -1) {
						return;
					}
					getData();
				}}
				navigation={navigation}
			/>
			{!!categoryName && hideBanner && (
				<View style={styles.viewBanner}>
					{loading && <Skeleton style={StyleSheet.absoluteFill} />}
					<BannerAd
						unitId={keyBanner_category}
						size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
						requestOptions={{
							requestNonPersonalizedAdsOnly: true,
						}}
						onAdLoaded={(e) => {
							if (e) {
								setLoading(false);
							}
						}}
						onAdFailedToLoad={(error) => {
							console.error('Advert failed to load: ', error);
						}}
					/>
				</View>
			)}
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
	},
	viewBanner: {
		alignItems: 'center',
		backgroundColor: colors.background_black,
	},
});
