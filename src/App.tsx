/* eslint-disable react-hooks/exhaustive-deps */
import { Loading, ToastDebug } from 'component';
import { Navigator } from 'core';
import AppStack from 'navigation';
import React, { useEffect, useRef } from 'react';
import { AppState, StatusBar, UIManager } from 'react-native';
import 'react-native-gesture-handler';
import { useAppOpenAd } from 'react-native-google-mobile-ads';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { Provider } from 'react-redux';
import { Device } from 'utils';
import { keyOnAppResume } from 'utils/GoogleAds';
import store from './redux/store';
export let data = { isShowAds: false };
const App: React.FC = () => {
	const appState = useRef<any>(AppState.currentState);
	const { isClosed, isLoaded, load, show } = useAppOpenAd(keyOnAppResume, {
		requestNonPersonalizedAdsOnly: true,
		keywords: [],
	});
	const isFirst = useRef(true);

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
		SystemNavigationBar.immersive();
	}, []);

	const handleAppStateChange = async (nextAppState: any) => {
		if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
			if (isFirst.current || data.isShowAds) {
				isFirst.current = false;
			} else {
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
		}
	}, [isClosed]);

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
		</Provider>
	);
};

export default App;
