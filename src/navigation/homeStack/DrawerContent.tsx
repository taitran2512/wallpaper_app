/* eslint-disable react-native/no-inline-styles */
import { images } from 'assets';
import { Screens } from 'common';
import { screenOptionsStack } from 'common/nagivationOption';
import { Buttons, Icon } from 'component';
import { Navigator, Style, colors, sizes, strings } from 'core/index';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Device, canOpenUrl } from 'utils';
import { urlPolicy, urlTermOfService } from 'utils/GoogleAds';
import { data } from '../../App';

const DrawerContent = () => {
	const DATA = [
		{
			title: strings.favorites,
			icon: images.ic_like,
			onPress: () => Navigator.navigate(Screens.Favorite),
		},
		{
			title: strings.moreApp,
			icon: images.ic_category,
		},
		{
			title: strings.tof,
			icon: images.ic_term,
			onPress: () => {
				data.isShowAds = true;
				canOpenUrl(urlTermOfService, strings.tof);
				setTimeout(() => {
					data.isShowAds = false;
				}, 500);
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
				data.isShowAds = true;
				canOpenUrl(urlPolicy, strings.policy);
				setTimeout(() => {
					data.isShowAds = false;
				}, 500);
			},
		},
	];

	return (
		<View style={styles.container}>
			<View
				style={{
					height: sizes.s60,
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: Device.getStatusBarHeight(),
				}}>
				<Text
					style={[screenOptionsStack.headerTitleStyle, Style.txtCenter, { color: 'white' }]}>
					Menu
				</Text>
			</View>
			{DATA.map((item, index) => (
				<Buttons
					key={index}
					style={[
						Style.row,
						{
							backgroundColor: 'rgba(255, 255, 255, 0.1)',
							justifyContent: 'flex-start',
							width: '100%',
							flex: 0,
						},
						Style.ph16,
						Style.top24,
					]}
					onPress={() => {
						item.onPress?.();
					}}>
					<Icon source={item.icon} size={sizes.s24} style={Style.right16} />
					<Text style={styles.subtitle}>{item.title}</Text>
				</Buttons>
			))}
		</View>
	);
};

export default DrawerContent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: sizes.s24,
	},
	title: {
		...Style.h4,
		marginTop: sizes.s8,
		marginBottom: sizes.s4,
		color: colors.white,
	},
	subtitle: {
		alignSelf: 'center',
		textAlign: 'center',
		color: colors.white,
		fontSize: sizes.s13,
	},
	button: {
		backgroundColor: '#F8C100',
		paddingVertical: sizes.s5,
		borderRadius: sizes.s8,
		marginTop: sizes.s8,
	},
	border: {
		backgroundColor: colors.white,
		height: 1,
		marginTop: sizes.s24,
	},
});
