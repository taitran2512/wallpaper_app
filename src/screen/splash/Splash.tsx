/* eslint-disable react-hooks/exhaustive-deps */
import { Stacks } from 'common';
import { Navigator, Style, colors, strings } from 'core/index';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AppOpenAd } from 'react-native-google-mobile-ads';
import { Storage } from 'utils';
import { keyAdsOpenApp } from 'utils/GoogleAds';

const Splash = () => {
	const appOpenAd = AppOpenAd.createForAdRequest(keyAdsOpenApp, {
		requestNonPersonalizedAdsOnly: true,
		keywords: [],
	});

	const onboardRef = useRef<any>(null);
	Storage.getMultiData([Storage.key.language, Storage.key.onboarding]).then((data) => {
		console.log(data, 'data');
		const [lang, onboard] = data;
		const appLanguage = lang || 'en';
		strings.setLanguage(appLanguage);
		onboardRef.current = onboard;
	});
	appOpenAd.addAdEventsListener(({ type }) => {
		console.log(type, 'type');
		if (type === 'loaded') {
			appOpenAd.show();
			return;
		}
		if (type === 'closed') {
			if (onboardRef.current) {
				setTimeout(() => {
					Navigator.goHome();
				}, 500);
			} else {
				setTimeout(() => {
					Navigator.replace(Stacks.LanguageSplash);
				}, 500);
				return;
			}
			return;
		}
		if (type === 'error') {
			Navigator.replace(Stacks.GoogleInterstitialsAdsSplash);
			return;
		}
	});

	useEffect(() => {
		appOpenAd.load();
	}, []);

	return (
		<View style={[Style.flex, Style.column_center, { backgroundColor: colors.backgroundApp }]}>
			<ActivityIndicator color={colors.blue} size="large" />
		</View>
	);
};
export default Splash;
