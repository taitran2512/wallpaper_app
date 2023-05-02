/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */

import { images } from 'assets';
import { Screens } from 'common';
import { ExampleScreen, Flex, Icon, ModalConfirm, SlideImage } from 'component';
import { colors, Navigator, screenHeight, sizes, Style } from 'core/index';
import WallpaperManageModule from 'library/wallpaper/WallpaperManager';
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
import { Device } from 'utils';
import { keyInterstitialApply, keyInterstitialApplyHigh } from 'utils/GoogleAds';

const Detail: React.FC<ScreenProps> = ({ navigation, route }) => {
	const { data, index } = route?.params || {};
	const [like, setLike] = useState<boolean>(false);

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
		Navigator.navigate(Screens.GoogleInterstitialsAds, { key: keyInterstitialApply });
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
				});
			}, 1000);
		}
		return;
	};

	const onHandleWallpaper = (type: string) => {
		try {
			Navigator.showLoading();
			modalRef.current.close();
			WallpaperManageModule.setWallpaper(
				{
					uri: 'https://lh3.googleusercontent.com/a-/ACB-R5RNd8d1199_In0k7IAeTslQI_mKerHw_Gwf3yiF=s888',
				},
				type,
				(res?: any) => {
					if (res.status === 'success') {
						showToastSuccess();
					}
				}
			);
		} catch (error: any) {
			Navigator.hideLoading();
			hideToast();
			Alert.alert('Alert', error);
		} finally {
			Navigator.hideLoading();
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
				<Text style={styles.txtSuccess}>Success</Text>
			</View>
		);
	};
	const onToggle = (types: string) => {
		if (type === 'home' || type === 'lock') {
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
					<Text style={[Style.txt14_white, Style.top4]}>Homescreen</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.item}
					activeOpacity={0.8}
					onPress={() => onToggle('lock')}>
					<Icon
						source={type === 'lock' ? images.ic_lock_selected : images.ic_lock}
						size={sizes.s24}
					/>
					<Text style={[Style.txt14_white, Style.top4]}>Lockscreen</Text>
				</TouchableOpacity>
				<View style={styles.line} />
				<TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={onApplyWallpaper}>
					<Text style={[Style.h6, { color: colors.white }]}>Apply</Text>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<Flex style={styles.container}>
			<SlideImage data={data} index={index} />
			{setHeader()}
			<ExampleScreen type={type} />
			{showToast ? renderToastNotify() : null}
			{renderButtonBottom()}
			<ModalConfirm
				ref={modalRef}
				title="Do you want to use this wallpaper for which screen?"
				content="">
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
			title: 'Both Homescreen & Lockscreen',
		},
		{
			type: 'home',
			title: 'Set as Homescreen',
		},
		{
			type: 'lock',
			title: 'Set as Lockscreen',
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
				<Text style={styles.txtCancel}>Cancel</Text>
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
		backgroundColor: colors.gradient,
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
		paddingHorizontal: sizes.s24,
		paddingVertical: sizes.s16,
		marginHorizontal: sizes.s16,
		marginBottom: sizes.s35,
		backgroundColor: colors.gradient5,
		borderRadius: sizes.s8,
		position: 'absolute',
		bottom: 10,
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
		bottom: screenHeight * 0.25,
	},
	line: {
		width: 1,
		height: '100%',
		backgroundColor: colors.white,
	},
	txtSuccess: {
		fontSize: sizes.s18,
		marginLeft: sizes.s34,
		color: colors.white,
	},
	line2: {
		marginVertical: sizes.s16,
	},
	itemOption: {
		paddingVertical: sizes.s2,
	},
	txtOption: {
		fontWeight: 'bold',
		color: colors.white,
		fontSize: sizes.s16,
		textAlign: 'center',
	},
	txtCancel: {
		color: colors.white,
		fontSize: sizes.s16,
		textAlign: 'center',
	},
});
