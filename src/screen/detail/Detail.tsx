/* eslint-disable react-hooks/exhaustive-deps */
import { images } from 'assets';
import { Flex } from 'component';
import { Navigator, screenHeight, screenWidth, sizes, Style } from 'core/index';
import { ScreenProps } from 'model';
import React, { useLayoutEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Device } from 'utils';

const Detail: React.FC<ScreenProps> = ({ navigation }) => {
	const initScreen = () => {
		navigation.setOptions({
			headerShown: false,
		});
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

	useLayoutEffect(() => {
		initScreen();
	}, []);

	return (
		<Flex style={styles.container}>
			<FastImage
				source={images.banner_default}
				style={[StyleSheet.absoluteFill, styles.background]}>
				{setHeader()}
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
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: sizes.s16,
		paddingVertical: sizes.s8,
		marginTop: Device.setHeaderHeight(sizes.s44),
	},
	button: {
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		height: sizes.s36,
		width: sizes.s36,
		borderRadius: sizes.s8,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
