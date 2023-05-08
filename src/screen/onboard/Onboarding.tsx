/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { images } from 'assets';
import { Screens, Stacks } from 'common';
import { WelcomArr } from 'common/data';
import { Buttons, Flex } from 'component';
import { Navigator, Style, colors, screenHeight, screenWidth, sizes } from 'core/index';
import { ScreenProps } from 'model';
import React, { useEffect, useRef, useState } from 'react';
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
import { Storage } from 'utils';
import { keyBanner_onboarding, keyInterstitialSplash } from 'utils/GoogleAds';

const Onboarding: React.FC<ScreenProps | any> = ({ route }) => {
	const { openAds } = route?.params || {};

	const [idx, setIdx] = useState<number>(0);
	const scrollRef = useRef<any>();

	useEffect(() => {
		if (!openAds) {
			setTimeout(() => {
				Navigator.navigate(Screens.GoogleInterstitialsAds, {
					key: keyInterstitialSplash,
				});
			}, 500);
		}
	}, []);

	const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
		setIdx(Math.round(index));
	};

	const onPressNext = () => {
		const page = idx + 1;
		if (page === WelcomArr.length) {
			Navigator.replace(Stacks.HomeStack, {
				screen: 'Language',
				params: {
					openAds,
				},
			});
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
						onMomentumScrollEnd={onScroll}>
						{renderPage()}
					</ScrollView>

					<Buttons
						title={idx === 2 ? 'Get Started' : 'Next'}
						onPress={onPressNext}
						style={[Style.mh16]}
					/>
					<View
						style={[
							Style.row_center,
							Style.top24,
							{
								paddingBottom: idx === 3 ? 0 : sizes.s24,
							},
						]}>
						{idx === 3 ? null : renderDot()}
					</View>

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
