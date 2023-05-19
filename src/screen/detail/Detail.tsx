/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */

import WallpaperApi from 'api/WallpaperApi';
import { images } from 'assets';
import { Screens } from 'common';
import { ExampleScreen, Flex, Icon, ModalConfirm, Skeleton, SlideImage } from 'component';
import { colors, Navigator, screenHeight, sizes, strings, Style } from 'core/index';
import WallpaperManageModule from 'library/wallpaper/WallpaperManager';
import { remove } from 'lodash';
import { ScreenProps } from 'model';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
	Alert,
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
import {
	keyBanner_category,
	keyInterstitialApply,
	keyInterstitialApplyHigh,
} from 'utils/GoogleAds';
import { IMAGE_URL } from 'utils/Https';

const Detail: React.FC<ScreenProps> = ({ navigation, route }) => {
	const { data, index } = route?.params || {};
	const [like, setLike] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const slideRef = useRef<any>();

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
				Navigator.navigate(Screens.GoogleInterstitialsAds, {
					key: keyInterstitialApplyHigh,
					key2: keyInterstitialApply,
					type: 'apply_high',
				});
			}, 1000);
		}
		return;
	};

	const onHandleWallpaper = (type: string) => {
		try {
			const item: WallpaperType = data[slideRef.current?.currentIndex];
			modalRef.current.close();
			WallpaperManageModule.setWallpaper(
				{
					uri: IMAGE_URL + item?.media?.url,
				},
				type,
				async (res?: any) => {
					if (res.status === 'success') {
						showToastSuccess();
						WallpaperApi.updateCountSetWallpaper(item?.id, item?.download_count + 1);
						const listSetWallpaper: any[] =
							(await Storage.getData(Storage.key.listSetWallpaper)) || [];
						const newlistSetWallpaper = [item, ...listSetWallpaper];
						Storage.setData(Storage.key.listSetWallpaper, newlistSetWallpaper);
					}
				}
			);
		} catch (error: any) {
			hideToast();
			Alert.alert('Alert', error);
		}
	};

	useLayoutEffect(() => {
		initScreen();
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
			const newLikedImageArray = [item, ...likedImageArray];
			Storage.setData(Storage.key.likedImageArray, newLikedImageArray);
		} else {
			remove(likedImageArray, (e) => e?.id === item?.id);
			Storage.setData(Storage.key.likedImageArray, likedImageArray);
		}
	};

	const setHeader = () => (
		<View style={[styles.header]}>
			<TouchableOpacity style={styles.button} onPress={() => Navigator.goBack()}>
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

	return (
		<Flex style={styles.container}>
			<SlideImage ref={slideRef} data={data} index={index} />
			{setHeader()}
			<ExampleScreen type={type} />
			{showToast ? renderToastNotify() : null}
			{renderButtonBottom()}
			<View style={styles.viewBanner}>
				{loading && <Skeleton style={StyleSheet.absoluteFill} />}
				<BannerAd
					unitId={keyBanner_category}
					size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
					requestOptions={{
						requestNonPersonalizedAdsOnly: true,
					}}
					onAdLoaded={(e) => {
						if (e) {
							setLoading(false);
						}
					}}
					onAdFailedToLoad={(error) => {
						console.error('Advert failed to load: ', error);
					}}
				/>
			</View>
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
		backgroundColor: colors.gradient5,
		height: sizes.s36,
		width: sizes.s36,
		borderRadius: sizes.s8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	item: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	viewGradient: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingHorizontal: sizes.s8,
		paddingVertical: sizes.s16,
		marginHorizontal: sizes.s16,
		marginBottom: sizes.s35,
		backgroundColor: colors.gradient5,
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
		backgroundColor: colors.gradient5,
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
