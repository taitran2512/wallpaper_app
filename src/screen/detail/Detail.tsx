/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import remoteConfig from '@react-native-firebase/remote-config';
import WallpaperApi from 'api/WallpaperApi';
import { images } from 'assets';
import { Screens } from 'common';
import { ExampleScreen, Flex, Icon, ModalConfirm, Skeleton, SlideImage } from 'component';
import { Navigator, Style, colors, screenHeight, sizes, strings } from 'core/index';
import WallpaperManageModule from 'library/wallpaper/WallpaperManager';
import { debounce, remove } from 'lodash';
import { ScreenProps } from 'model';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
	Alert,
	BackHandler,
	Image,
	LayoutAnimation,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	UIManager,
	View,
} from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { Device, Storage } from 'utils';
import { keyBanner_home, keyInterstitialApply, keyInterstitialApplyHigh } from 'utils/GoogleAds';
import { IMAGE_URL } from 'utils/Https';
import { data as Ads } from '../.././App';
const Detail: React.FC<ScreenProps | any> = ({ navigation, route }) => {
	const { data, index } = route?.params || {};
	const [like, setLike] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [loadingDetail, setLoadingDetail] = useState<boolean>(true);

	const slideRef = useRef<any>();
	const [hideBanner, setHideBanner] = useState<boolean>(false);
	const [hideAds1, setHideAds1] = useState<boolean>(false);
	const [hideAds2, setHideAds2] = useState<boolean>(false);
	if (Platform.OS === 'android') {
		if (UIManager.setLayoutAnimationEnabledExperimental) {
			UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	}
	const [type, setType] = useState<string>('');
	const [showToast, setShowToast] = useState<boolean>(false);
	const modalRef = useRef<any>();

	const initScreen = () => {
		navigation.setOptions({
			headerShown: false,
		});
	};

	const onApplyWallpaper = () => {
		setType('');
		modalRef.current.open();
	};

	const showToastSuccess = () => {
		setShowToast(true);
		setType('');
		LayoutAnimation.configureNext(
			LayoutAnimation.create(
				300,
				LayoutAnimation.Types.easeInEaseOut,
				LayoutAnimation.Properties.opacity
			)
		);
	};

	const hideToast = () => {
		if (showToast) {
			setType('');
			setTimeout(() => {
				setShowToast(false);
				if (hideAds1) {
					Ads.isShowAds = true;
					navigation.navigate(Screens.GoogleInterstitialsAds, {
						key: keyInterstitialApplyHigh,
						type: 'apply_high',
					});
					return;
				}
				if (hideAds2) {
					Ads.isShowAds = true;
					navigation.navigate(Screens.GoogleInterstitialsAds, {
						key: keyInterstitialApply,
						type: 'apply_high',
					});
					return;
				}
			}, 1000);
		}
		return;
	};

	const onHandleWallpaper = async (type: string) => {
		try {
			Ads.isShowAds = true;
			modalRef.current.close();
			Navigator.showLoading();
			const item: WallpaperType = data[slideRef.current?.currentIndex];
			if (type === 'both') {
				WallpaperManageModule.setWallpaper(
					{ uri: IMAGE_URL + item?.media?.url },
					'lock',
					(res: any) => {
						if (res?.status === 'success') {
							WallpaperManageModule.setWallpaper(
								{ uri: IMAGE_URL + item?.media?.url },
								'home',
								(result: any) => {
									if (result?.status === 'success') {
										Ads.isShowAds = true;
										Navigator.hideLoading();
										showToastSuccess();
									} else {
										Navigator.hideLoading();
									}
								}
							);
						} else {
							Navigator.hideLoading();
						}
					}
				);
			} else {
				WallpaperManageModule.setWallpaper(
					{ uri: IMAGE_URL + item?.media?.url },
					type,
					(result: any) => {
						if (result?.status === 'success') {
							Ads.isShowAds = true;
							Navigator.hideLoading();
							showToastSuccess();
						} else {
							Navigator.hideLoading();
						}
					}
				);
			}
			// WallpaperManageModule.setWallpaper(
			// 	{ uri: IMAGE_URL + item?.media?.url },
			// 	type,
			// 	(result: any) => {
			// 		if (result?.status === 'success') {
			// 			Ads.isShowAds = true;
			// 			Navigator.hideLoading();
			// 			showToastSuccess();
			// 		} else {
			// 			Navigator.hideLoading();
			// 		}
			// 	}
			// );
			WallpaperApi.updateCountSetWallpaper(item?.id, item?.download_count + 1);
			const listSetWallpaper: any[] =
				(await Storage.getData(Storage.key.listSetWallpaper)) || [];
			if (listSetWallpaper.find((e) => e.id === item.id)) {
				return;
			}
			const newlistSetWallpaper = [item, ...listSetWallpaper];
			Storage.setData(Storage.key.listSetWallpaper, newlistSetWallpaper);
		} catch (error: any) {
			hideToast();
			Alert.alert('Alert', error);
		}
	};

	useLayoutEffect(() => {
		initScreen();
		setLoadingDetail(false);
	}, []);

	useEffect(() => {
		hideToast();
	}, [showToast]);

	const onPressLike = async () => {
		const newValue = !like;
		setLike(newValue);
		const item: WallpaperType = data[slideRef.current?.currentIndex];

		const likedImageArray: any[] = (await Storage.getData(Storage.key.likedImageArray)) || [];
		if (newValue) {
			if (likedImageArray.find((e) => e.id === item.id)) {
				return;
			}
			const newLikedImageArray = [item, ...likedImageArray];
			Storage.setData(Storage.key.likedImageArray, newLikedImageArray);
		} else {
			remove(likedImageArray, (e) => e?.id === item?.id);
			Storage.setData(Storage.key.likedImageArray, likedImageArray);
		}
	};

	const onIndexChange = debounce(async (idx: number) => {
		const item: WallpaperType = data[idx];
		const likedImageArray: any[] = (await Storage.getData(Storage.key.likedImageArray)) || [];
		if (likedImageArray.find((e) => e.id === item.id)) {
			setLike(true);
		} else {
			setLike(false);
		}
	}, 100);

	const setHeader = () => (
		<View style={[styles.header]}>
			<TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
				{/* <BlurView
					style={[StyleSheet.absoluteFill]}
					blurType="light"
					blurAmount={10}
					blurRadius={25}
					overlayColor="transparent"
					reducedTransparencyFallbackColor="white"
				/> */}
				<Image source={images.ic_back_arrow} style={Style.icon16} />
			</TouchableOpacity>
			<TouchableOpacity onPress={onPressLike}>
				<Image source={like ? images.ic_liked : images.ic_like} style={Style.icon24} />
			</TouchableOpacity>
		</View>
	);

	const renderToastNotify = () => {
		return (
			<View style={styles.viewGradientToast}>
				<Image source={images.ic_success} style={Style.icon24} />
				<Text style={styles.txtSuccess}>{strings.success}</Text>
			</View>
		);
	};

	const onToggle = (types: string) => {
		if (type === types) {
			setType('');
		} else {
			setType(types);
		}
	};

	const renderButtonBottom = () => {
		return (
			<View style={styles.viewGradient}>
				{/* <BlurView
					style={[StyleSheet.absoluteFill]}
					blurType="light"
					blurAmount={10}
					overlayColor="transparent"
					reducedTransparencyFallbackColor="white"
				/> */}
				<TouchableOpacity
					style={styles.item}
					activeOpacity={0.8}
					onPress={() => onToggle('home')}>
					<Icon
						source={type === 'home' ? images.ic_home_selected : images.ic_home}
						size={sizes.s24}
					/>
					<Text style={[Style.txt14_white, Style.top4]}>{strings.homeScreen}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.item}
					activeOpacity={0.8}
					onPress={() => onToggle('lock')}>
					<Icon
						source={type === 'lock' ? images.ic_lock_selected : images.ic_lock}
						size={sizes.s24}
					/>
					<Text style={[Style.txt14_white, Style.top4, Style.ph10]}>{strings.lockscreen}</Text>
				</TouchableOpacity>
				<View style={styles.line} />
				<TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={onApplyWallpaper}>
					<Text style={[Style.h6, { color: colors.white }]}>{strings.apply}</Text>
				</TouchableOpacity>
			</View>
		);
	};

	useEffect(() => {
		getConfigRemote();
	}, []);

	const getConfigRemote = () => {
		remoteConfig()
			.setDefaults({
				banner_home: false,
				inter_apply: false,
				inter_apply_high: false,
			})
			.then(() => remoteConfig()?.fetch(0))
			.then(() => remoteConfig()?.fetchAndActivate());
		const isBanner: any = remoteConfig()?.getValue('banner_home').asBoolean();
		const ads1: any = remoteConfig()?.getValue('inter_apply_high').asBoolean();
		const ads2: any = remoteConfig()?.getValue('inter_apply').asBoolean();

		setHideBanner(isBanner);
		setHideAds1(ads1);
		setHideAds2(ads2);
	};
	const handleBackButtonClick = () => {
		return true;
	};
	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
		return () => {
			BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
		};
	}, []);
	return (
		<Flex style={styles.container}>
			<SlideImage ref={slideRef} data={data} index={index} onIndexChange={onIndexChange} />
			{setHeader()}
			<ExampleScreen type={type} />
			{showToast ? renderToastNotify() : null}
			{renderButtonBottom()}
			{loadingDetail && <Skeleton style={StyleSheet.absoluteFill} />}
			{hideBanner && (
				<View style={styles.viewBanner}>
					{loading && <Skeleton style={StyleSheet.absoluteFill} />}
					{hideBanner && (
						<BannerAd
							unitId={keyBanner_home}
							size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
							requestOptions={{
								requestNonPersonalizedAdsOnly: true,
							}}
							onAdLoaded={(e) => {
								if (e) {
									setLoading(false);
								}
							}}
							onAdOpened={() => {
								Ads.isShowAds = true;
								setTimeout(() => {
									Ads.isShowAds = false;
								}, 1000);
							}}
							onAdFailedToLoad={(error) => {
								setHideBanner(false);
								console.error('Advert failed to load: ', error);
							}}
						/>
					)}
				</View>
			)}

			<ModalConfirm ref={modalRef} title={strings.questionWallpaper} content="">
				<View style={[Style.line, styles.line2]} />
				<ItemOption
					onPress={(type: string) => onHandleWallpaper(type)}
					cancel={() => modalRef.current.close()}
				/>
			</ModalConfirm>
		</Flex>
	);
};

export default Detail;
const ItemOption = ({ onPress, cancel }: any) => {
	const options = [
		{
			type: 'both',
			title: strings.option1,
		},
		{
			type: 'home',
			title: strings.option2,
		},
		{
			type: 'lock',
			title: strings.option3,
		},
	];
	const handlePress = (type: string) => {
		onPress && onPress(type);
	};
	return (
		<>
			{options.map((item, index) => (
				<TouchableOpacity
					style={styles.itemOption}
					onPress={() => handlePress(item.type)}
					key={index}>
					<Text style={styles.txtOption}>{item.title}</Text>
					<View style={[Style.line, styles.line2]} />
				</TouchableOpacity>
			))}
			<TouchableOpacity style={styles.itemOption} onPress={cancel}>
				<Text style={styles.txtCancel}>{strings.cancel}</Text>
			</TouchableOpacity>
		</>
	);
};
const styles = StyleSheet.create({
	container: {
		justifyContent: 'flex-start',
		flex: 1,
	},
	background: {
		justifyContent: 'space-between',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: sizes.s16,
		paddingVertical: sizes.s8,
		position: 'absolute',
		left: 0,
		right: 0,
		marginTop: Device.setHeaderHeight(sizes.s16),
	},
	button: {
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		height: sizes.s36,
		width: sizes.s36,
		borderRadius: sizes.s8,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	item: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		paddingVertical: sizes.s16,
	},
	viewGradient: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		overflow: 'hidden',
		marginHorizontal: sizes.s16,
		marginBottom: sizes.s35,
		backgroundColor: colors.gradient1,
		borderRadius: sizes.s8,
		position: 'absolute',
		bottom: sizes.s35,
		left: 0,
		right: 0,
	},
	viewGradientToast: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: sizes.s24,
		paddingVertical: sizes.s16,
		marginHorizontal: sizes.s16,
		backgroundColor: colors.gradient1,
		borderRadius: sizes.s8,
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: screenHeight * 0.26,
	},
	line: {
		width: 1,
		height: '100%',
		backgroundColor: colors.white,
	},
	txtSuccess: {
		...Style.txt18_white,
		marginLeft: sizes.s34,
	},
	line2: {
		marginVertical: sizes.s16,
	},
	itemOption: {
		paddingVertical: sizes.s2,
	},
	txtOption: {
		...Style.txt16_bold,
		color: colors.white,
		textAlign: 'center',
	},
	txtCancel: {
		...Style.txt16_white,
		textAlign: 'center',
	},
	viewBanner: {
		alignItems: 'center',
		backgroundColor: colors.background_black,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	},
});
