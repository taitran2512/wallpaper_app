/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import NativeAdView, { AdManager } from 'react-native-admob-native-ads';

const NativeAds = ({ index, media = false, type = 'image', loadOnMount = true }: any) => {
	const nativeAdRef = useRef();
	const [aspectRatio, setAspectRatio] = useState<any>(1.5);
	const [loading, setLoading] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);
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
	);
};
export default NativeAds;
