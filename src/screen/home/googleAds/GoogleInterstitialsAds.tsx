/* eslint-disable react-hooks/exhaustive-deps */
import { colors, Navigator, Style } from 'core/index';
import { ScreenProps } from 'model';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import { data } from '../../../App';

const GoogleInterstitialsAds: React.FC<ScreenProps> = ({ navigation, route }) => {
	const { key = '', key2 = '' } = route.params || {};
	const [changeKey, setChangeKey] = useState<string>(key);
	console.log(changeKey, 'changeKey');
	const { isClosed, isLoaded, load, show, error } = useInterstitialAd(changeKey, {
		requestNonPersonalizedAdsOnly: true,
	});

	const initScreen = () => {
		navigation.setOptions({
			headerShown: false,
		});
	};

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
			setChangeKey(key2);
		}
	}, [error]);
	useEffect(() => {
		load();
	}, [load]);

	useEffect(() => {
		if (isClosed) {
			load();
			Navigator.goBack();
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
