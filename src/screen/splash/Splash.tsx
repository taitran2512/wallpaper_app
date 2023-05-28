/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import remoteConfig from '@react-native-firebase/remote-config';
import { Stacks } from 'common';
import { colors, Navigator, strings, Style } from 'core/index';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { Storage } from 'utils';

const Splash = () => {
	const openAdsRef = useRef(true);
	const interShowRef = useRef(true);
	const onboardRef = useRef<any>(null);

	const getConfigRemote = async () => {
		await remoteConfig().setDefaults({
			open_splash: true,
			inter_splash: false,
		});
		try {
			const res = await Promise.all([
				remoteConfig()?.fetch(0),
				remoteConfig().ensureInitialized(),
				remoteConfig()?.fetchAndActivate(),
			]);
		} catch (error) {
			console.log(error);
		}

		const openSplash: any = remoteConfig()?.getValue('open_splash').asBoolean();
		const interSplash: any = remoteConfig()?.getValue('inter_splash').asBoolean();
		openAdsRef.current = openSplash;
		interShowRef.current = interSplash;
		Storage.getMultiData([Storage.key.language, Storage.key.onboarding]).then((data) => {
			const [lang, onboard] = data;
			const appLanguage = lang || 'en';
			strings.setLanguage(appLanguage);
			onboardRef.current = onboard;
			handleOpenAds();
		});
	};

	useEffect(() => {
		SystemNavigationBar.stickyImmersive();
		getConfigRemote();
	}, []);

	const handleOpenAds = () => {
		if (openAdsRef.current) {
			Navigator.replace(Stacks.AdsOpen);
			return;
		}
		if (interShowRef.current) {
			Navigator.replace(Stacks.GoogleInterstitialsAdsSplash);
			return;
		}
		if (onboardRef.current) {
			Navigator.goHome();
			return;
		} else {
			setTimeout(() => {
				Navigator.replace(Stacks.LanguageSplash);
			}, 500);
		}
	};
	return (
		<View style={[Style.flex, Style.column_center, { backgroundColor: colors.backgroundApp }]}>
			<ActivityIndicator color={colors.blue} size="large" />
		</View>
	);
};
export default Splash;
