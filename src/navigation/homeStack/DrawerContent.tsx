/* eslint-disable react-native/no-inline-styles */
import { images } from 'assets';
import { Screens } from 'common';
import { screenOptionsStack } from 'common/nagivationOption';
import { Icon } from 'component';
import { colors, Navigator, sizes, strings, Style } from 'core/index';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Device } from 'utils';
import { urlPolicy, urlTermOfService } from 'utils/GoogleAds';

const DrawerContent = () => {
	const DATA = [
		{
			title: strings.favorites,
			icon: images.ic_like,
			onPress: () => Navigator.navigate(Screens.Favorite),
		},

		{
			title: strings.tof,
			icon: images.ic_term,
			onPress: () => {
				Navigator.navigate(Screens.Webview, {
					link: urlTermOfService,
					title: strings.tof,
				});
			},
		},
		{
			title: strings.language,
			icon: images.ic_language,
			onPress: () => Navigator.navigate(Screens.Language),
		},
		{
			title: strings.policy,
			icon: images.ic_lock,
			onPress: () => {
				// data.isShowAds = true;
				// canOpenUrl(urlPolicy, strings.policy);
				// setTimeout(() => {
				// 	data.isShowAds = false;
				// }, 500);
				Navigator.navigate(Screens.Webview, {
					link: urlPolicy,
					title: strings.policy,
				});
			},
		},
	];

	return (
		<View style={styles.container}>
			<View
				style={{
					height: sizes.s45,
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: Device.getStatusBarHeight(),
				}}>
				<Text
					style={[screenOptionsStack.headerTitleStyle, Style.txtCenter, { color: 'white' }]}>
					{strings.menu}
				</Text>
			</View>
			{DATA.map((item, index) => (
				<TouchableOpacity
					activeOpacity={0.8}
					key={index}
					style={[Style.ph16, Style.top16]}
					onPress={() => {
						item.onPress?.();
					}}>
					<ImageBackground
						source={images.bg_button}
						style={[styles.button]}
						resizeMode="stretch">
						<Icon source={item.icon} size={sizes.s24} style={[Style.right16, Style.left16]} />
						<Text style={styles.subtitle}>{item.title}</Text>
					</ImageBackground>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default DrawerContent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: sizes.s16,
	},

	title: {
		...Style.h4,
		marginTop: sizes.s8,
		marginBottom: sizes.s4,
		color: colors.white,
	},
	subtitle: {
		...Style.txt13_white,
		alignSelf: 'center',
		textAlign: 'center',
	},
	button: {
		...Style.row,
		height: sizes.s50,
		flex: 0,
		marginHorizontal: -16,
	},
	border: {
		backgroundColor: colors.white,
		height: 1,
		marginTop: sizes.s24,
	},
});
