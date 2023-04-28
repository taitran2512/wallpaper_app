/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Loading, ToastDebug } from 'component';
import { Navigator } from 'core';
import AppStack from 'navigation';
import React, { useEffect, useRef } from 'react';
import { AppState, StatusBar, UIManager } from 'react-native';
import 'react-native-gesture-handler';
import { MobileAds, useInterstitialAd } from 'react-native-google-mobile-ads';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Device } from 'utils';
import { keyInterstitialOnAppResume } from 'utils/GoogleAds';
import store from './redux/store';

const requestOptions = {};
const App: React.FC = () => {
	useEffect(() => {
		if (Device.isAndroid) {
			if (UIManager.setLayoutAnimationEnabledExperimental) {
				UIManager.setLayoutAnimationEnabledExperimental(true);
			}
		}
	}, []);
	const { isLoaded, isClosed, load, show } = useInterstitialAd(
		keyInterstitialOnAppResume,
		requestOptions
	);
	const appState = useRef(AppState.currentState);

	const handleAppStateChange = async (nextAppState: any) => {
		if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
			console.log('App has come to the foreground! Showing ad...');
			show();
			console.log('Ad should have been shown.');
		} else if (nextAppState === 'background') {
			show();
			console.log('App is going to the background');
		} else {
			console.log('inactive-state transition (iOS)');
		}
		appState.current = nextAppState;
	};

	const initApp = async () => {
		StatusBar.setBarStyle('light-content');
		await MobileAds().initialize();
		load();
	};

	useEffect(() => {
		initApp();
		const sub = AppState.addEventListener('change', handleAppStateChange);
		return () => {
			sub.remove();
		};
	}, []);

	useEffect(() => {
		if (isClosed) {
			console.log('Reloading ad...');
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
