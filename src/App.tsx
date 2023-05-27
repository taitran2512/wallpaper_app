/* eslint-disable no-catch-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import remoteConfig from '@react-native-firebase/remote-config';
import { Loading, ModalAdsResume, ToastDebug } from 'component';
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
import { Device, Storage } from 'utils';
import { keyOnAppResume } from 'utils/GoogleAds';
import store from './redux/store';

export let data = {
	isShowAds: false,
};
const App: React.FC = () => {
	const appState = useRef<any>(AppState.currentState);
	const showAdsRef = useRef<any>();
	const { isClosed, isLoaded, load, show, error } = useAppOpenAd(keyOnAppResume, {
		requestNonPersonalizedAdsOnly: true,
		keywords: [],
	});
	const isFirst = useRef(true);
	const openResumeRef = useRef(false);

	const getConfigRemoteFirebase = async () => {
		try {
			await remoteConfig();
			await remoteConfig().setDefaults({
				open_resume: false,
			});
			await remoteConfig().fetch(0);
			await remoteConfig()?.fetchAndActivate();
			const openResume: any = remoteConfig()?.getValue('open_resume').asBoolean();
			openResumeRef.current = openResume;
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
		if (error) {
			showAdsRef.current?.close();
		}
	}, [error]);

	useEffect(() => {
		SystemNavigationBar.stickyImmersive();
		getConfigRemoteFirebase();
		Storage.setData('FIRST OPEN APP', 'true');
	}, []);

	const handleAppStateChange = async (nextAppState: any) => {
		if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
			if (isFirst.current || data.isShowAds) {
				isFirst.current = false;
			} else {
				showAdd();
			}
		}
		appState.current = nextAppState;
	};
	const showAdd = () => {
		if (openResumeRef.current) {
			showAdsRef.current?.open();
			show();
		}
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
