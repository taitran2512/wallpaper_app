/* eslint-disable react-hooks/exhaustive-deps */
import remoteConfig from '@react-native-firebase/remote-config';
import { setConfigFirebase } from 'action/appAction';
import { Loading, ModalAdsResume, ToastDebug } from 'component';
import { Navigator } from 'core';
import AppStack from 'navigation';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, StatusBar, UIManager } from 'react-native';
import 'react-native-gesture-handler';
import { useAppOpenAd } from 'react-native-google-mobile-ads';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { Provider } from 'react-redux';
import { configRemoteFirebase, Device } from 'utils';
import { keyOnAppResume } from 'utils/GoogleAds';
import LogUtil from 'utils/LogUtil';
import store from './redux/store';

export let data = { isShowAds: false };
const App: React.FC = () => {
	const appState = useRef<any>(AppState.currentState);
	const showAdsRef = useRef<any>();
	const { isClosed, isLoaded, load, show } = useAppOpenAd(keyOnAppResume, {
		requestNonPersonalizedAdsOnly: true,
		keywords: [],
	});
	const isFirst = useRef(true);
	const [getConfig, setGetConfig] = useState<boolean>(false);
	const getConfigRemoteFirebase = async () => {
		try {
			await remoteConfig();
			await remoteConfig().fetch(0);
			const config = await remoteConfig().getAll();
			LogUtil.i(config);
			if (config) {
				setGetConfig(true);
				store.dispatch(setConfigFirebase(config));
				configRemoteFirebase.data = config;
			}
		} catch (error: any) {
			console.log(error.message);
		}
	};
	useEffect(() => {
		setTimeout(() => {
			SplashScreen.hide();
		}, 500);

		if (Device.isAndroid) {
			if (UIManager.setLayoutAnimationEnabledExperimental) {
				UIManager.setLayoutAnimationEnabledExperimental(true);
			}
		}
	}, []);

	useEffect(() => {
		SystemNavigationBar.stickyImmersive();
		getConfigRemoteFirebase();
	}, []);

	const handleAppStateChange = async (nextAppState: any) => {
		if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
			if (isFirst.current || data.isShowAds) {
				isFirst.current = false;
			} else {
				showAdsRef.current?.open();
				show();
			}
		}
		appState.current = nextAppState;
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
		load();
	}, [load]);

	useEffect(() => {
		if (isClosed) {
			load();
			showAdsRef.current?.close();
		}
	}, [isClosed]);
	if (!getConfig) {
		return null;
	}
	return (
		<Provider store={store}>
			<StatusBar
				barStyle="light-content"
				backgroundColor={'transparent'}
				hidden={false}
				translucent={true}
			/>
			<SafeAreaProvider>
				<AppStack />
			</SafeAreaProvider>
			<Loading ref={(ref) => Navigator.setLoadingRef(ref)} />
			<ToastDebug ref={(ref) => Navigator.setToastDebugRef(ref)} />
			<ModalAdsResume ref={showAdsRef} />
		</Provider>
	);
};

export default App;
