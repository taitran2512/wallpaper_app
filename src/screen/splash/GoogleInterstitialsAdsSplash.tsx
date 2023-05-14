/* eslint-disable react-hooks/exhaustive-deps */
import { Stacks } from 'common';
import { colors, Navigator, strings, Style } from 'core/index';
import { ScreenProps } from 'model';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import { Storage } from 'utils';
import { keyInterstitialSplash } from 'utils/GoogleAds';

const GoogleInterstitialsAds: React.FC<ScreenProps | any> = ({ navigation }) => {
	const { isClosed, isLoaded, load, show, error } = useInterstitialAd(keyInterstitialSplash, {
		requestNonPersonalizedAdsOnly: true,
	});
	const onboardRef = useRef<any>(null);
	Storage.getMultiData([Storage.key.language, Storage.key.onboarding]).then((data) => {
		console.log(data, 'data');
		const [lang, onboard] = data;
		const appLanguage = lang || 'en';
		strings.setLanguage(appLanguage);
		onboardRef.current = onboard;
	});
	const initScreen = () => {
		navigation.setOptions({
			headerShown: false,
		});
	};

	useEffect(() => {
		initScreen();
	}, []);

	useEffect(() => {
		if (isLoaded) {
			show();
		}
	}, [isLoaded]);

	useEffect(() => {
		load();
	}, [load]);

	useEffect(() => {
		if (isClosed) {
			if (onboardRef.current) {
				Navigator.goHome();
			} else {
				setTimeout(() => {
					Navigator.replace(Stacks.LanguageSplash);
				}, 500);
			}
		}
	}, [isClosed]);

	useEffect(() => {
		if (error) {
			Navigator.goHome();
		}
	}, [error]);

	return (
		<View style={[Style.flex, Style.column_center, { backgroundColor: colors.backgroundApp }]}>
			<ActivityIndicator color={colors.blue} size="large" />
		</View>
	);
};
export default GoogleInterstitialsAds;
