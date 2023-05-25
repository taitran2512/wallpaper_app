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
	Storage.getMultiData([Storage.key.language, Storage.key.onboarding]).then((data) => {
		const [lang, onboard] = data;
		const appLanguage = lang || 'en';
		strings.setLanguage(appLanguage);
		onboardRef.current = onboard;
	});
	appOpenAd.addAdEventsListener(({ type }) => {
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
			Navigator.replace(Stacks.LanguageSplash);
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
export default AdsOpen;
