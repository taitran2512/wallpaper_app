/* eslint-disable react-hooks/exhaustive-deps */
import { BlurView } from '@react-native-community/blur';
import { images } from 'assets';
import { Buttons, Flex, Icon } from 'component';
import { Navigator, screenHeight, screenWidth, sizes, Style } from 'core/index';
import { ScreenProps } from 'model';
import React, { useLayoutEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Device } from 'utils';

const Detail: React.FC<ScreenProps> = ({ navigation }) => {
	const [type, setType] = useState<string>('HOME');
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
				<Buttons
					style={{
						marginHorizontal: sizes.s16,
						marginBottom: 70,
						height: 'auto',
					}}
					children={
						<View
							style={{
								width: '100%',
								flexDirection: 'row',
								justifyContent: 'space-around',
								alignItems: 'center',
								paddingHorizontal: sizes.s24,
								paddingVertical: sizes.s16,
							}}>
							<TouchableOpacity style={styles.item} onPress={() => setType('HOME')}>
								<Icon
									source={type === 'HOME' ? images.ic_home_selected : images.ic_home}
									size={sizes.s24}
								/>
								<Text style={[Style.txt14_white, Style.top4]}>Homescreen</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.item} onPress={() => setType('LOCK')}>
								<Icon
									source={type === 'LOCK' ? images.ic_lock_selected : images.ic_lock}
									size={sizes.s24}
								/>
								<Text style={[Style.txt14_white, Style.top4]}>Lockscreen</Text>
							</TouchableOpacity>
							<View style={{ width: 1, height: '100%', backgroundColor: 'white' }} />
							<TouchableOpacity style={styles.item}>
								<Text style={[Style.h6, { color: 'white' }]}>Apply</Text>
							</TouchableOpacity>
						</View>
					}
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
});
