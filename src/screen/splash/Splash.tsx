/* eslint-disable react-hooks/exhaustive-deps */
import { Stacks } from 'common';
import { colors, Navigator, strings, Style } from 'core/index';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AppOpenAd } from 'react-native-google-mobile-ads';
import { useSelector } from 'react-redux';
import { getConfigFirebaseSeletor } from 'selector/appSelector';
import { Storage } from 'utils';
import { keyAdsOpenApp } from 'utils/GoogleAds';
import LogUtil from 'utils/LogUtil';

const Splash = () => {
	const appOpenAd = AppOpenAd.createForAdRequest(keyAdsOpenApp, {
		requestNonPersonalizedAdsOnly: true,
		keywords: [],
	});
	const config = useSelector(getConfigFirebaseSeletor);
	const [optionsOpenAppAds, setOpenAppAds] = useState<boolean>(false);

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
		if (type === 'loaded' && optionsOpenAppAds) {
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
		} else {
			handleAdsByConfig();
		}
	});

	useEffect(() => {
		appOpenAd.load();
	}, []);

	const handleAdsByConfig = () => {
		console.log('object');
	};

	useEffect(() => {
		LogUtil.i(config);
		const getKey = config?.find?.((x: any) => x === 'open_splash');
		// console.log(data['banner_onboarding']);
		setOpenAppAds(getKey?._value);
	}, [optionsOpenAppAds]);
	return (
		<View style={[Style.flex, Style.column_center, { backgroundColor: colors.backgroundApp }]}>
			<ActivityIndicator color={colors.blue} size="large" />
		</View>
	);
};
export default Splash;
