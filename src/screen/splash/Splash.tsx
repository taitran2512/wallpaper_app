/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Stacks } from 'common';
import { colors, Navigator, strings, Style } from 'core/index';
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
	const openAppAds = useRef<boolean>(false);
	const onboardRef = useRef<any>(null);
	Storage.getMultiData([Storage.key.language, Storage.key.onboarding]).then((data) => {
		console.log(data, 'data');
		const [lang, onboard] = data;
		const appLanguage = lang || 'vi';
		strings.setLanguage(appLanguage);
		onboardRef.current = onboard;
	});
	appOpenAd.addAdEventsListener(({ type }) => {
		if (type === 'loaded') {
			appOpenAd.show();
		} else if (type === 'closed') {
			openAppAds.current = true;
			if (onboardRef.current) {
				Navigator.goHome();
			} else {
				setTimeout(() => {
					Navigator.replace(Stacks.Onboarding, { openAds: openAppAds.current });
				}, 500);
				console.log('else closed');
			}
		} else if (type === 'error') {
			openAppAds.current = false;
			if (onboardRef.current) {
				Navigator.goHome();
			} else {
				setTimeout(() => {
					Navigator.replace(Stacks.Onboarding, { openAds: openAppAds.current });
				}, 500);
				console.log('else error');
			}
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
