/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { images } from 'assets';
import { Screens } from 'common';
import { WelcomArr } from 'common/data';
import { Buttons, Flex, Icon, NativeAds } from 'component';
import { Navigator, Style, colors, screenHeight, screenWidth, sizes, strings } from 'core/index';
import { ScreenProps } from 'model';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import LinearGradient from 'react-native-linear-gradient';
import { Device, Storage } from 'utils';
import { keyBanner_onboarding, keyInterstitialSplash } from 'utils/GoogleAds';

const Onboarding: React.FC<ScreenProps> = ({ navigation, route }) => {
	const { openAds } = route?.params || {};

	const [language, setLanguage] = useState<string>('');

	useEffect(() => {
		if (!openAds) {
			setTimeout(() => {
				Navigator.navigate(Screens.GoogleInterstitialsAds, {
					key: keyInterstitialSplash,
				});
			}, 500);
		}
		navigation.setOptions({
			headerShown: false,
		});
		Storage.getData(Storage.key.language).then((lang) => {
			const appLanguage = lang || 'vi';
			strings.setLanguage(appLanguage);
			setLanguage(appLanguage);
		});
	}, []);

	const setAppLanguage = (lan: string) => {
		setLanguage(lan);
		strings.setLanguage(lan);
		Storage.setData(Storage.key.language, lan);
	};

	const onPressNext = () => {
		if (navigation.canGoBack()) {
			navigation.goBack();
		} else {
			Navigator.goHome();
		}
	};

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
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ flexGrow: 1 }}
						pagingEnabled
						scrollEventThrottle={16}>
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

					<Buttons title={'Save and continue'} onPress={onPressNext} style={[Style.mh16]} />
					<View
						style={[
							Style.row_center,
							Style.top24,
							{
								paddingBottom: sizes.s24,
							},
						]}></View>

					<View style={styles.viewBanner}>
						<BannerAd
							unitId={keyBanner_onboarding}
							size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
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
		alignItems: 'center',
	},
});
