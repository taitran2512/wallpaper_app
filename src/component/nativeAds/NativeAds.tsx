/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { colors, sizes } from 'core/index';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, DeviceEventEmitter, StyleSheet, Text, View } from 'react-native';
import NativeAdView, {
	AdManager,
	AdvertiserView,
	CallToActionView,
	HeadlineView,
	IconView,
	StarRatingView,
	StoreView,
	TaglineView,
} from 'react-native-admob-native-ads';

const NativeAds = ({ index, media = false, type = 'image', loadOnMount = true, keys }: any) => {
	const nativeAdRef = useRef<any>();
	const [aspectRatio, setAspectRatio] = useState<any>(1.5);
	const [loading, setLoading] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);
	const [hideNative, setHideNative] = useState(false);
	const onAdFailedToLoad = (event: any) => {
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
		 * If you have recently created AdMob IDs for your ads, it might take
		 * a few days until the ads will start showing.
		 */
		if (event.error.message) {
			setHideNative(true);
		}
		console.log('AD', 'FAILED', event.error.message);
	};

	const onAdLoaded = () => {
		console.log('AD', 'LOADED', 'Ad has loaded successfully');
	};

	const onAdClicked = () => {
		console.log('AD', 'CLICK', 'User has clicked the Ad');
	};

	const onAdImpression = () => {
		// console.log('AD', 'IMPRESSION', 'Ad impression recorded');
	};

	const onNativeAdLoaded = (event: any) => {
		// console.log('AD', 'RECIEVED', 'Unified ad  Recieved', event);
		setLoading(false);
		setLoaded(true);
		setError(false);
		setAspectRatio(event.aspectRatio);
	};

	const onAdLeftApplication = () => {
		console.log('AD', 'LEFT', 'Ad left application');
	};

	const onViewableItemsChanged = useCallback(
		(event: any) => {
			/**
			 * [STEP IV] We check if any AdViews are currently viewable.
			 */
			let viewableAds = event.viewableItems.filter((i: any) => i.key.indexOf('ad') !== -1);

			viewableAds.forEach((adView: any) => {
				if (adView.index === index && !loaded) {
					/**
					 * [STEP V] If the ad is viewable and not loaded
					 * already, we will load the ad.
					 */
					setLoading(true);
					setLoaded(false);
					setError(false);
					// console.log('AD', 'IN VIEW', 'Loading ' + index);
					nativeAdRef.current?.loadAd();
				} else {
					/**
					 * We will not reload ads or load
					 * ads that are not viewable currently
					 * to save bandwidth and requests sent
					 * to server.
					 */
					if (loaded) {
						// console.log('AD', 'IN VIEW', 'Loaded ' + index);
					} else {
						// console.log('AD', 'NOT IN VIEW', index);
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
		let onViewableItemsChangedHandler: any;
		nativeAdRef.current?.loadAd();
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
		<NativeAdView
			ref={nativeAdRef}
			onAdLoaded={onAdLoaded}
			onAdFailedToLoad={onAdFailedToLoad}
			onAdLeftApplication={onAdLeftApplication}
			onAdClicked={onAdClicked}
			onAdImpression={onAdImpression}
			onNativeAdLoaded={onNativeAdLoaded}
			requestNonPersonalizedAdsOnly={true}
			refreshInterval={60000 * 2}
			style={[styles.container]}
			videoOptions={{
				customControlsRequested: true,
			}}
			repository={'imageAd'}>
			{!hideNative && (
				<View
					style={{
						width: '100%',
						alignItems: 'center',
					}}>
					<View style={styles.tag}>
						<Text style={{ fontSize: sizes.s8 }}>Ad</Text>
					</View>
					<View
						style={{
							width: '100%',
							height: '100%',
							backgroundColor: '#D9D9D9',
							position: 'absolute',
							justifyContent: 'center',
							alignItems: 'center',
							opacity: !loading && !error && loaded ? 0.6 : 0.6,
							zIndex: !loading && !error && loaded ? 0 : 10,
						}}>
						{loading && <ActivityIndicator size={28} color="#a9a9a9" />}
						{error && <Text style={{ color: '#a9a9a9' }}>:-(</Text>}
					</View>

					<View
						style={{
							width: '100%',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'flex-start',
							paddingVertical: sizes.s16,
							paddingHorizontal: sizes.s16,
							// opacity: loading || error || !loaded ? 0 : 1,
						}}>
						<IconView style={styles.logoAds} />
						<View
							style={{
								flexGrow: 1,
								flexShrink: 1,
								paddingHorizontal: 6,
							}}>
							<HeadlineView
								style={{
									fontWeight: 'bold',
									fontSize: sizes.s14,
									color: 'rgba(29, 36, 51, 1)',
								}}
							/>
							<TaglineView
								numberOfLines={2}
								style={{
									color: 'rgba(29, 36, 51, 1)',
									fontSize: sizes.s14,
								}}
							/>
							<AdvertiserView
								style={{
									fontSize: sizes.s14,
									color: 'rgba(29, 36, 51, 1)',
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
									style={{
										width: 65,
										marginLeft: 10,
									}}
								/>
							</View>
						</View>
					</View>
					{/* <ImageView style={{ width: '80%', height: 50, marginBottom: sizes.s20 }} /> */}

					<CallToActionView
						style={styles.btnAds}
						buttonAndroidStyle={styles.buttonStyle}
						allCaps
						textStyle={styles.txtBtnAds}
					/>

					{/* {media ? <NativeMediaView onVideoStart={() => {}} /> : null} */}
				</View>
			)}
		</NativeAdView>
	);
};
export default React.memo(NativeAds);

const styles = StyleSheet.create({
	container: {
		marginHorizontal: sizes.s16,
		marginBottom: sizes.s16,
		borderRadius: sizes.s10,
		borderWidth: 1,
	},
	logoAds: {
		width: sizes.s60,
		height: sizes.s60,
	},
	btnAds: {
		width: 300,
		height: sizes.s50,
		marginBottom: sizes.s12,
		paddingVertical: sizes.s12,
		alignItems: 'center',
	},

	buttonStyle: {
		borderRadius: sizes.s16,
		backgroundColor: '#e7e7e7',
	},
	txtBtnAds: {
		fontSize: sizes.s16,
		textAlign: 'center',
		color: colors.black1,
		marginBottom: sizes.s12,
		fontWeight: 'bold',
	},
	tag: {
		position: 'absolute',
		top: 0,
		left: 2,
		padding: sizes.s4,
		backgroundColor: colors.blue,
		zIndex: 999,
		borderTopLeftRadius: sizes.s15,
		borderBottomRightRadius: sizes.s15,
	},
});
