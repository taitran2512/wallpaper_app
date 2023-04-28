/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { images } from 'assets';
import { Buttons, Flex, Icon } from 'component';
import { colors, Navigator, screenHeight, screenWidth, sizes, strings, Style } from 'core/index';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
	ActivityIndicator,
	AppState,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import MobileAds, {
	BannerAd,
	BannerAdSize,
	useInterstitialAd,
} from 'react-native-google-mobile-ads';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
import { Device, Storage } from 'utils';
import { keyBanner_onboarding, keyInterstitialSplash } from 'utils/GoogleAds';

const WelcomArr = [
	{
		title: 'Welcome to Sunret Dope Wallpapers',
		content: 'Corem ipsum dolor sit amet, Nunc vulputate libero et amet',
	},
	{
		title: 'Welcome to Sunret Dope Wallpapers',
		content: 'Corem ipsum dolor sit amet, Nunc vulputate libero et amet',
	},
	{
		title: 'Welcome to Sunret Dope Wallpapers',
		content: 'Corem ipsum dolor sit amet, Nunc vulputate libero et amet',
	},
];
const requestOptions = {};
const Onboarding = () => {
	const [idx, setIdx] = useState<number>(0);
	const [language, setLanguage] = useState<string>('');
	const scrollRef = useRef<any>();
	const { isLoaded, isClosed, load, show } = useInterstitialAd(
		keyInterstitialSplash,
		requestOptions
	);
	useLayoutEffect(() => {
		Storage.getMultiData([Storage.key.language, Storage.key.onboarding])
			.then((data) => {
				const [lang, onboard] = data;
				const appLanguage = lang || 'vi';
				strings.setLanguage(appLanguage);
				setLanguage(appLanguage);
				if (onboard) {
					Navigator.goHome();
				}
			})
			.finally(() => {
				setTimeout(() => {
					SplashScreen.hide();
				}, 500);
			});
	}, []);

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

	const setAppLanguage = (lan: string) => {
		setLanguage(lan);
		strings.setLanguage(lan);
		Storage.setData(Storage.key.language, lan);
	};

	const onPressNext = () => {
		const page = idx + 1;
		if (page === WelcomArr.length + 1) {
			Navigator.goHome();
			Storage.setData(Storage.key.onboarding, 'true');
		} else {
			setIdx(page);
			scrollRef.current.scrollTo({ x: screenWidth * page });
		}
	};

	const renderPage = () => {
		return WelcomArr.map((item, index) => (
			<View key={String(index)} style={styles.page}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.subtitle}>{item.content} </Text>
			</View>
		));
	};

	const renderDot = () => {
		return WelcomArr.map((item, index) => (
			<View
				key={String(index)}
				style={[Style.right6, index === idx ? styles.dot_active : styles.dot]}
			/>
		));
	};

	if (!language) {
		return (
			<View style={[Style.flex, Style.column_center, { backgroundColor: colors.backgroundApp }]}>
				<ActivityIndicator color={colors.blue} size="large" />
			</View>
		);
	}

	return (
		<Flex style={styles.container}>
			<FastImage
				source={images.onboarding}
				style={[StyleSheet.absoluteFill, styles.background]}
			/>
			<LinearGradient
				style={{ flex: 1 }}
				colors={[
					'rgba(0, 0, 0, 0.01)',
					'rgba(0, 0, 0, 0.2)',
					'rgba(0, 0, 0, 0.5)',
					'rgba(0, 0, 0, 0.7)',
				]}>
				<View style={styles.container}>
					<ScrollView
						ref={scrollRef}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ flexGrow: 1 }}
						pagingEnabled
						scrollEventThrottle={16}
						scrollEnabled={false}>
						{renderPage()}
						<View
							style={{
								width: screenWidth,
								paddingHorizontal: sizes.s16,
								paddingTop: Device.setHeaderHeight(sizes.s24),
							}}>
							<Buttons
								onPress={() => setAppLanguage('vi')}
								style={[Style.row_between, Style.top16, Style.ph16]}>
								<Text style={[Style.h6, { color: colors.white }]}>Tiếng Việt</Text>
								<Icon
									source={
										language === 'vi' ? images.ic_checkbox_checked : images.ic_checkbox
									}
									size={sizes.s24}
								/>
							</Buttons>
							<Buttons
								onPress={() => setAppLanguage('en')}
								style={[Style.row_between, Style.top16, Style.ph16]}>
								<Text style={[Style.h6, { color: colors.white }]}>English</Text>
								<Icon
									source={
										language === 'en' ? images.ic_checkbox_checked : images.ic_checkbox
									}
									size={sizes.s24}
								/>
							</Buttons>
						</View>
					</ScrollView>
					<View style={styles.viewBanner}>
						<BannerAd
							unitId={keyBanner_onboarding}
							size={BannerAdSize.BANNER}
							requestOptions={{
								requestNonPersonalizedAdsOnly: true,
							}}
							onAdLoaded={() => {
								console.log('Advert loaded');
							}}
							onAdFailedToLoad={(error) => {
								console.error('Advert failed to load: ', error);
							}}
						/>
					</View>
					<Buttons
						title={idx === WelcomArr.length ? 'Save and continue' : 'Next'}
						onPress={onPressNext}
						style={[Style.mh16]}
					/>
					<View
						style={[
							Style.row_center,
							Style.top24,
							{
								paddingBottom: sizes.s34,
							},
						]}>
						{renderDot()}
					</View>
				</View>
			</LinearGradient>
		</Flex>
	);
};

export default Onboarding;

const styles = StyleSheet.create({
	background: {
		width: screenWidth,
		height: screenHeight,
	},
	container: {
		justifyContent: 'flex-end',
		flex: 1,
	},
	title: {
		color: colors.white,
		fontSize: sizes.s30,
		textAlign: 'center',
		marginBottom: sizes.s48,
		lineHeight: sizes.s42,
		fontWeight: 'bold',
	},
	subtitle: {
		color: colors.white,
		fontSize: sizes.s18,
		textAlign: 'center',
		marginBottom: sizes.s64,
	},
	page: {
		width: screenWidth,
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingHorizontal: sizes.s16,
	},
	dot: {
		width: sizes.s6,
		height: sizes.s6,
		borderRadius: sizes.s4,
		backgroundColor: '#999999',
	},
	dot_active: {
		width: sizes.s6,
		height: sizes.s6,
		borderRadius: sizes.s4,
		backgroundColor: colors.white,
	},
	viewBanner: {
		marginHorizontal: sizes.s16,
		marginBottom: sizes.s16,
		alignItems: 'center',
	},
});
