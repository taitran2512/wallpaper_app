/* eslint-disable react-native/no-inline-styles */
import { images } from 'assets';
import { Screens } from 'common';
import { Icon } from 'component';
import { colors, Navigator, sizes, Style } from 'core/index';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Device } from 'utils';

const DrawerContent = ({ drawerRef }: any) => {
	const DATA = [
		{
			title: 'Home',
			icon: images.ic_home,
		},
		{
			title: 'Favourites',
			icon: images.ic_like,
			isShowBorder: true,
			onPress: () => Navigator.navigate(Screens.Favorite),
		},
		{
			title: 'More app',
			icon: images.ic_more_app,
		},
		{
			title: 'Term and Conditions',
			icon: images.ic_term,
		},
		{
			title: 'Language',
			icon: images.ic_language,
		},
		{
			title: 'Privacy',
			icon: images.ic_lock,
		},
		{
			title: 'Rate us',
			icon: images.ic_rate,
		},
	];

	const renderBorderBottom = () => <View style={styles.border} />;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>4K Wallpaper</Text>
			{renderBorderBottom()}
			{DATA.map((item, index) => (
				<View key={index}>
					<TouchableOpacity
						style={[Style.row, Style.top24]}
						onPress={() => {
							item.onPress?.();
							drawerRef?.current?.closeDrawer();
						}}>
						<Icon source={item.icon} size={sizes.s24} style={Style.right16} />
						<Text style={styles.subtitle}>{item.title}</Text>
					</TouchableOpacity>
					{item.isShowBorder && renderBorderBottom()}
				</View>
			))}
		</View>
	);
};

export default DrawerContent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(51, 51, 51, 0.3)',
		paddingTop: Device.setHeaderHeight(sizes.s30),
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
		color: 'white',
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
