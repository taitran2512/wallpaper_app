/* eslint-disable react-hooks/exhaustive-deps */
import { images } from 'assets';
import { Flex, Icon, ModalConfirm } from 'component';
import { Navigator, Style, colors, screenHeight, screenWidth, sizes } from 'core/index';
import { ScreenProps } from 'model';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
	Image,
	LayoutAnimation,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	UIManager,
	View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Device } from 'utils';

const Detail: React.FC<ScreenProps> = ({ navigation }) => {
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
		setShowToast(true);
		modalRef.current.open();
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
			setTimeout(() => {
				setShowToast(false);
			}, 2000);
		}
		return;
	};
	const setHeader = () => (
		<View style={styles.header}>
			<TouchableOpacity style={styles.button} onPress={() => Navigator.goBack()}>
				<Image source={images.ic_back_arrow} style={Style.icon16} />
			</TouchableOpacity>

			<TouchableOpacity>
				<Image source={images.ic_like} style={Style.icon24} />
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
	useLayoutEffect(() => {
		initScreen();
	}, []);
	useEffect(() => {
		hideToast();
	}, [showToast]);
	const renderButtonBottom = () => {
		return (
			<View style={styles.viewGradient}>
				<TouchableOpacity
					style={styles.item}
					activeOpacity={0.8}
					onPress={() => setType('HOME')}>
					<Icon
						source={type === 'HOME' ? images.ic_home_selected : images.ic_home}
						size={sizes.s24}
					/>
					<Text style={[Style.txt14_white, Style.top4]}>Homescreen</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.item}
					activeOpacity={0.8}
					onPress={() => setType('LOCK')}>
					<Icon
						source={type === 'LOCK' ? images.ic_lock_selected : images.ic_lock}
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
			<FastImage
				source={images.banner_default}
				style={[StyleSheet.absoluteFill, styles.background]}>
				{setHeader()}
				{showToast ? renderToastNotify() : null}
				{renderButtonBottom()}
				<ModalConfirm
					ref={modalRef}
					title="Alert"
					content="Please upload one or more documents to verify that the bank account listed matches the name mentioned"
				/>
			</FastImage>
		</Flex>
	);
};

export default Detail;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'flex-start',
		flex: 1,
		paddingBottom: sizes.s34,
		paddingHorizontal: sizes.s16,
	},
	background: {
		width: screenWidth,
		height: screenHeight,
		justifyContent: 'space-between',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: sizes.s16,
		paddingVertical: sizes.s8,
		marginTop: Device.setHeaderHeight(sizes.s16),
	},
	button: {
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
		marginBottom: sizes.s70,
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		borderRadius: sizes.s8,
	},
	viewGradientToast: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: sizes.s24,
		paddingVertical: sizes.s16,
		marginHorizontal: sizes.s16,
		marginBottom: sizes.s70,
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		borderRadius: sizes.s8,
	},
	line: {
		width: 1,
		height: '100%',
		backgroundColor: colors.white,
	},
	txtSuccess: {
		fontSize: sizes.s18,
		marginLeft: sizes.s34,
	},
});
