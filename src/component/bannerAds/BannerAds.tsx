import { colors } from 'core/index';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
interface IProps {
	key: string;
}
const BannerAds: React.FC<IProps> = ({ key = '' }) => {
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const timeOut = setTimeout(() => {
			setLoading(false);
		}, 1500);
		return () => {
			clearTimeout(timeOut);
		};
	}, []);

	if (!key) {
		return null;
	}
	return (
		<View style={styles.viewBanner}>
			{loading ? (
				<ActivityIndicator color={colors.blue} size="large" />
			) : (
				<BannerAd
					unitId={key}
					size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
					requestOptions={{
						requestNonPersonalizedAdsOnly: true,
					}}
					onAdLoaded={(e) => console.log(e)}
					onAdFailedToLoad={(error) => {
						console.error('Advert failed to load: ', error);
					}}
				/>
			)}
		</View>
	);
};
export default React.memo(BannerAds);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	viewBanner: {
		alignItems: 'center',
	},
});
