/* eslint-disable react-hooks/exhaustive-deps */
import { Stacks } from 'common';
import { colors, Navigator, strings, Style } from 'core/index';
import { ScreenProps } from 'model';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AppOpenAd } from 'react-native-google-mobile-ads';
import { Storage } from 'utils';
import { keyAdsOpenApp } from 'utils/GoogleAds';

const AdsOpen: React.FC<ScreenProps | any> = () => {
	const appOpenAd = AppOpenAd.createForAdRequest(keyAdsOpenApp, {
		requestNonPersonalizedAdsOnly: true,
		keywords: [],
	});
	const onboardRef = useRef<any>(null);
	let timeout: any;
	Storage.getMultiData([Storage.key.language, Storage.key.onboarding]).then((data) => {
		const [lang, onboard] = data;
		const appLanguage = lang || 'en';
		strings.setLanguage(appLanguage);
		onboardRef.current = onboard;
	});
	const handleTimeOut = () => {
		timeout = setTimeout(() => {
			if (onboardRef.current) {
				setTimeout(() => {
					clearTimeout(timeout);
					Navigator.goHome();
				}, 1000);
			} else {
				setTimeout(() => {
					clearTimeout(timeout);
					Navigator.replace(Stacks.LanguageSplash);
				}, 1000);
				return;
			}
		}, 5000);
	};
	appOpenAd.addAdEventsListener(({ type }) => {
		if (type === 'loaded') {
			appOpenAd.show();
			return;
		}
		if (type === 'closed') {
			if (onboardRef.current) {
				setTimeout(() => {
					clearTimeout(timeout);
					Navigator.goHome();
				}, 1000);
			} else {
				setTimeout(() => {
					clearTimeout(timeout);
					Navigator.replace(Stacks.LanguageSplash);
				}, 1000);
				return;
			}
			return;
		}
		if (type === 'error') {
			clearTimeout(timeout);
			Navigator.replace(Stacks.GoogleInterstitialsAdsSplash);
			return;
		}
	});

	useEffect(() => {
		appOpenAd.load();
		handleTimeOut();
	}, []);

	return (
		<View style={[Style.flex, Style.column_center, { backgroundColor: colors.backgroundApp }]}>
			<ActivityIndicator color={colors.blue} size="large" />
		</View>
	);
};
export default AdsOpen;
