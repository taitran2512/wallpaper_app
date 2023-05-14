/* eslint-disable react-native/no-inline-styles */
import { images } from 'assets';
import { Flex } from 'component';
import { Navigator, Style, colors, screenHeight, screenWidth, sizes, strings } from 'core/index';
import { ScreenProps } from 'model';
import React, { useEffect, useRef, useState } from 'react';
import {
	ActivityIndicator,
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import LinearGradient from 'react-native-linear-gradient';
import { Storage } from 'utils';
import { keyBanner_onboarding } from 'utils/GoogleAds';

const Onboarding: React.FC<ScreenProps | any> = () => {
	const [idx, setIdx] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(true);
	const scrollRef = useRef<any>();
	const WelcomArr = [
		{
			id: 0,
			title: strings.titleOnboarding1,
			content: strings.titleOnboarding1,
		},
		{
			id: 1,
			title: strings.titleOnboarding2,
			content: strings.descriptionOnboarding2,
		},
		{
			id: 3,
			title: strings.titleOnboarding3,
			content: strings.descriptionOnboarding3,
		},
	];

	const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
		setIdx(Math.round(index));
	};

	const onPressNext = () => {
		const page = idx + 1;
		if (page === WelcomArr.length) {
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
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1500);
	}, []);
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

					<View
						style={[
							Style.row_between,
							Style.top24,
							Style.ph24,
							{
								paddingBottom: sizes.s24,
							},
						]}>
						<View style={{ flex: 1 }} />
						<View style={Style.row_center}>{renderDot()}</View>
						<View style={{ flex: 1, alignItems: 'flex-end' }}>
							<TouchableOpacity onPress={onPressNext}>
								<Text style={[Style.txt16_white, Style.bold]}>
									{idx === 2 ? strings.started : strings.next}
								</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.viewBanner}>
						{loading ? (
							<ActivityIndicator color={colors.blue} size="large" />
						) : (
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
						)}
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
		width: '80%',
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
