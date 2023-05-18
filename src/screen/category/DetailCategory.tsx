/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */

import { images } from 'assets';
import { dataDetailCategory } from 'common/data';
import { Flex, GridImageView, NavigationButton, Skeleton } from 'component';
import { colors, sizes } from 'core/index';
import { ScreenProps } from 'model';
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { keyBanner_category } from 'utils/GoogleAds';

const DetailCategory: React.FC<ScreenProps> = ({ navigation, route }) => {
	const cateogry: any = route?.params || {};
	const [loading, setLoading] = useState<boolean>(true);

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
