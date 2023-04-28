import { dataDetailCategory } from 'common/data';
import { GridImageView } from 'component';
import { colors } from 'core/index';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { keyBanner_home } from 'utils/GoogleAds';

const Popular = () => {
	return (
		<>
			<View style={styles.viewBanner}>
				<BannerAd
					unitId={keyBanner_home}
					size={BannerAdSize.BANNER}
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
			</View>
			<GridImageView data={dataDetailCategory} />
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
