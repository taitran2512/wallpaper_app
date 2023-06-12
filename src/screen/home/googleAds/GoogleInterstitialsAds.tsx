/* eslint-disable react-hooks/exhaustive-deps */
import { colors, Navigator, Style } from 'core/index';
import { ScreenProps } from 'model';
import React, { useEffect } from 'react';
import { ActivityIndicator, AppState, View } from 'react-native';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import { data } from '../../../App';

const GoogleInterstitialsAds: React.FC<ScreenProps> = ({ navigation, route }) => {
	const { key, goBack = false } = route.params || {};
	const { isClosed, isLoaded, load, show, error } = useInterstitialAd(key, {
		requestNonPersonalizedAdsOnly: true,
	});

	const initScreen = () => {
		navigation.setOptions({
			headerShown: false,
		});
	};

	const handleAppStateChange = async (nextAppState: any) => {
		if (nextAppState === 'active') {
			show();
		}
	};
	useEffect(() => {
		if (isLoaded) {
			const sub = AppState.addEventListener('change', handleAppStateChange);
			return () => {
				sub.remove();
			};
		}
	}, [isLoaded]);
	useEffect(() => {
		data.isShowAds = true;
		initScreen();
	}, []);

	useEffect(() => {
		if (isLoaded) {
			show();
		}
	}, [isLoaded]);
	useEffect(() => {
		if (error) {
			if (goBack) {
				Navigator.goBack();
			} else {
				Navigator.goBack();
				Navigator.goBack();
			}
			setTimeout(() => {
				data.isShowAds = false;
			}, 500);
		}
	}, [error]);
	useEffect(() => {
		load();
	}, [load]);

	useEffect(() => {
		if (isClosed) {
			load();
			if (goBack) {
				Navigator.goBack();
			} else {
				Navigator.goBack();
				Navigator.goBack();
			}
			setTimeout(() => {
				data.isShowAds = false;
			}, 500);
		}
	}, [isClosed]);

	return (
		<View style={[Style.flex, Style.column_center, { backgroundColor: colors.backgroundApp }]}>
			<ActivityIndicator color={colors.blue} size="large" />
		</View>
	);
};
export default GoogleInterstitialsAds;
