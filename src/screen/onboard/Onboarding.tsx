/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { images } from 'assets';
import { Screens } from 'common';
import { Buttons, Flex, Icon } from 'component';
import { colors, Navigator, screenHeight, screenWidth, sizes, strings, Style } from 'core/index';
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
import NativeAdView, {
	AdManager,
	AdvertiserView,
	CallToActionView,
	HeadlineView,
	IconView,
	NativeMediaView,
	StarRatingView,
	StoreView,
	TaglineView,
} from 'react-native-admob-native-ads';
import FastImage from 'react-native-fast-image';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import LinearGradient from 'react-native-linear-gradient';
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

const Onboarding: React.FC<ScreenProps | any> = ({
	route,
	index,
	media = false,
	type = 'image',
	loadOnMount = true,
}) => {
	const { openAds } = route?.params || {};
	const nativeAdRef = useRef();
	const [aspectRatio, setAspectRatio] = useState<any>(1.5);
	const [loading, setLoading] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);
	const [idx, setIdx] = useState<number>(0);
	const [language, setLanguage] = useState<string>('');
	const scrollRef = useRef<any>();

	useLayoutEffect(() => {
		Storage.getMultiData([Storage.key.language, Storage.key.onboarding]).then((data) => {
			const [lang, onboard] = data;
			const appLanguage = lang || 'vi';
			strings.setLanguage(appLanguage);
			setLanguage(appLanguage);
			if (onboard) {
				Navigator.goHome();
			}
		});
	}, []);
	useEffect(() => {
		nativeAdRef.current?.loadAd();
	}, []);
	useEffect(() => {
		if (!openAds) {
			setTimeout(() => {
				Navigator.navigate(Screens.GoogleInterstitialsAds, {
					key: keyInterstitialSplash,
				});
			}, 500);
		}
		return;
	}, []);

	const setAppLanguage = (lan: string) => {
		setLanguage(lan);
		strings.setLanguage(lan);
		Storage.setData(Storage.key.language, lan);
	};

	const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
		setIdx(Math.round(index));
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
	const onAdFailedToLoad = (event) => {
		setError(true);
		setLoading(false);
		/**
		 * Sometimes when you try to load an Ad, it will keep failing
		 * and you will recieve this error: "The ad request was successful,
		 * but no ad was returned due to lack of ad inventory."
		 *
		 * This error is not a bug or issue with our Library.
		 * Just remove the app from your phone & clean your build
		 * folders by running ./gradlew clean in /android folder
		 * and for iOS clean the project in xcode. Hopefully the error will
		 * be gone.
		 *
		 * [iOS] If you get this error: "Cannot find an ad network adapter with
		 * the name(s): com.google.DummyAdapter". The ad inventory is empty in your
		 * location. Try using a vpn to get ads in a different location.
		 *
		 * If you have recently created AdMob IDs for your ads, it might take
		 * a few days until the ads will start showing.
		 */
		console.log('AD', 'FAILED', event.error.message);
	};

	const onAdLoaded = () => {
		console.log('AD', 'LOADED', 'Ad has loaded successfully');
	};

	const onAdClicked = () => {
		console.log('AD', 'CLICK', 'User has clicked the Ad');
	};

	const onAdImpression = () => {
		console.log('AD', 'IMPRESSION', 'Ad impression recorded');
	};

	const onNativeAdLoaded = (event) => {
		console.log('AD', 'RECIEVED', 'Unified ad  Recieved', event);
		setLoading(false);
		setLoaded(true);
		setError(false);
		setAspectRatio(event.aspectRatio);
	};

	const onAdLeftApplication = () => {
		console.log('AD', 'LEFT', 'Ad left application');
	};

	const onViewableItemsChanged = useCallback(
		(event) => {
			/**
			 * [STEP IV] We check if any AdViews are currently viewable.
			 */
			let viewableAds = event.viewableItems.filter((i) => i.key.indexOf('ad') !== -1);

			viewableAds.forEach((adView) => {
				if (adView.index === index && !loaded) {
					/**
					 * [STEP V] If the ad is viewable and not loaded
					 * already, we will load the ad.
					 */
					setLoading(true);
					setLoaded(false);
					setError(false);
					console.log('AD', 'IN VIEW', 'Loading ' + index);
					nativeAdRef.current?.loadAd();
				} else {
					/**
					 * We will not reload ads or load
					 * ads that are not viewable currently
					 * to save bandwidth and requests sent
					 * to server.
					 */
					if (loaded) {
						console.log('AD', 'IN VIEW', 'Loaded ' + index);
					} else {
						console.log('AD', 'NOT IN VIEW', index);
					}
				}
			});
		},
		[index, loaded]
	);
	const Events = {
		onViewableItemsChanged: 'onViewableItemsChanged',
	};
	useEffect(() => {
		/**
		 * for previous steps go to List.js file.
		 *
		 * [STEP III] We will subscribe to onViewableItemsChanged event in all AdViews in the List.
		 */
		let onViewableItemsChangedHandler;

		if (!loadOnMount) {
			onViewableItemsChangedHandler = DeviceEventEmitter.addListener(
				Events.onViewableItemsChanged,
				onViewableItemsChanged
			);
		}

		return () => {
			if (!loadOnMount) {
				onViewableItemsChangedHandler.remove();
			}
		};
	}, [index, loadOnMount, loaded, onViewableItemsChanged]);

	useEffect(() => {
		if (loadOnMount || index <= 15) {
			setLoading(true);
			setLoaded(false);
			setError(false);
			nativeAdRef.current?.loadAd();
		}
		return () => {
			setLoaded(false);
		};
	}, [loadOnMount, index]);
	const config = {
		maxAdContetRating: 'MA',
		tagForChildDirectedTreatment: false,
		tagForUnderAgeConsent: false,
	};
	AdManager.isTestDevice().then((result) => console.log(result));
	useEffect(() => {
		const init = async () => {
			await AdManager.setRequestConfiguration({
				...config,
				trackingAuthorized: true,
			});

			setLoading(false);
		};

		init();
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
						onScroll={onScroll}
						// scrollEnabled={false}
					>
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
								paddingBottom: idx === 3 ? 0 : sizes.s24,
							},
						]}>
						{idx === 3 ? null : renderDot()}
					</View>
					{idx === 3 ? (
						<NativeAdView
							ref={nativeAdRef}
							onAdLoaded={onAdLoaded}
							onAdFailedToLoad={onAdFailedToLoad}
							onAdLeftApplication={onAdLeftApplication}
							onAdClicked={onAdClicked}
							onAdImpression={onAdImpression}
							onNativeAdLoaded={onNativeAdLoaded}
							refreshInterval={60000 * 2}
							adUnitID="ca-app-pub-6548166688052880/8131685939" // TEST adUnitID
							style={{
								width: '98%',
								alignSelf: 'center',
								backgroundColor: 'transparent',
							}}
							videoOptions={{
								customControlsRequested: true,
							}}
							repository={'imageAd'}>
							<View
								style={{
									width: '100%',
									alignItems: 'center',
								}}>
								<View
									style={{
										width: '100%',
										height: '100%',
										backgroundColor: '#f0f0f0',
										position: 'absolute',
										justifyContent: 'center',
										alignItems: 'center',
										opacity: !loading && !error && loaded ? 0 : 1,
										zIndex: !loading && !error && loaded ? 0 : 10,
									}}>
									{loading && <ActivityIndicator size={28} color="#a9a9a9" />}
									{error && <Text style={{ color: '#a9a9a9' }}>:-(</Text>}
								</View>

								<View
									style={{
										height: 100,
										width: '100%',
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'flex-start',
										paddingHorizontal: 10,
										opacity: loading || error || !loaded ? 0 : 1,
									}}>
									<IconView
										style={{
											width: 60,
											height: 60,
										}}
									/>
									<View
										style={{
											flexGrow: 1,
											flexShrink: 1,
											paddingHorizontal: 6,
										}}>
										<HeadlineView
											// hello="abc"
											style={{
												fontWeight: 'bold',
												fontSize: 13,
											}}
										/>
										<TaglineView
											numberOfLines={2}
											style={{
												fontSize: 11,
											}}
										/>
										<AdvertiserView
											style={{
												fontSize: 10,
												color: 'gray',
											}}
										/>

										<View
											style={{
												flexDirection: 'row',
												alignItems: 'center',
											}}>
											<StoreView
												style={{
													fontSize: 12,
												}}
											/>
											<StarRatingView
												// starSize={12}
												style={{
													width: 65,
													marginLeft: 10,
												}}
											/>
										</View>
									</View>

									<CallToActionView
										style={[
											{
												minHeight: 45,
												paddingHorizontal: 12,
												justifyContent: 'center',
												alignItems: 'center',
												elevation: 10,
												maxWidth: 100,
												width: 80,
											},
										]}
										allCaps
										textStyle={{
											fontSize: 13,
											flexWrap: 'wrap',
											textAlign: 'center',
											color: 'white',
										}}
									/>
								</View>
								{media ? <NativeMediaView /> : null}
							</View>
						</NativeAdView>
					) : (
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
					)}
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
