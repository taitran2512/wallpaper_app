import { dataDetailCategory } from 'common/data';
import { GridImageView } from 'component';
import { colors } from 'core/index';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { keyBanner_home } from 'utils/GoogleAds';

const Popular = () => {
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const timeOut = setTimeout(() => {
			setLoading(false);
		}, 1500);
		return () => {
			clearTimeout(timeOut);
		};
	}, []);
	return (
		<>
			<GridImageView data={dataDetailCategory} />
			<View style={styles.viewBanner}>
				{loading ? (
					<ActivityIndicator color={colors.blue} size="large" />
				) : (
					<BannerAd
						unitId={keyBanner_home}
						size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
						requestOptions={{
							requestNonPersonalizedAdsOnly: true,
						}}
						onAdLoaded={() => {
							console.log('Advert loaded');
						}}
						onAdFailedToLoad={(error) => {
							console.error('Advert failed to load: ', error);
						}}
					/>
				)}
			</View>
		</>
	);
};

export default Popular;
const styles = StyleSheet.create({
	viewBanner: {
		alignItems: 'center',
		backgroundColor: colors.background_black,
	},
});
