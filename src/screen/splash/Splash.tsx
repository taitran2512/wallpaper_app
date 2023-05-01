/* eslint-disable react-hooks/exhaustive-deps */
import { Stacks } from 'common';
import { colors, Navigator, Style } from 'core/index';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AppOpenAd } from 'react-native-google-mobile-ads';
import { keyAdsOpenApp } from 'utils/GoogleAds';

const Splash = () => {
	const appOpenAd = AppOpenAd.createForAdRequest(keyAdsOpenApp, {
		requestNonPersonalizedAdsOnly: true,
		keywords: [],
	});
	const openAppAds = useRef<boolean>(false);
	appOpenAd.addAdEventsListener(({ type }) => {
		if (type === 'loaded') {
			appOpenAd.show();
			return;
		}
		if (type === 'closed') {
			openAppAds.current = true;
			setTimeout(() => {
				Navigator.replace(Stacks.Onboarding, { openAds: openAppAds.current });
			}, 500);
			return;
		}
		if (type === 'error') {
			openAppAds.current = false;
			setTimeout(() => {
				Navigator.replace(Stacks.Onboarding, { openAds: openAppAds.current });
			}, 500);
			return;
		}
		return;
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
