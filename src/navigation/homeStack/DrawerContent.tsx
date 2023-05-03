import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { BlurView } from '@react-native-community/blur';
import { Device } from 'utils';
import { Style, sizes } from 'core/index';
import { Icon } from 'component';
import { images } from 'assets';

const DrawerContent = (props: DrawerContentComponentProps) => {
	const DATA = [
		{
			title: 'Home',
			icon: images.ic_home,
		},
		{
			title: 'Favourites',
			icon: images.ic_like,
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

	return (
		<View style={styles.container}>
			<Icon size={sizes.s30} source={images.ic_premium} style={{ alignSelf: 'center' }} />
			<Text style={styles.title}>PRO ACCESS</Text>
			<Text style={styles.subtitle}>Remove Ads - Unlimited content </Text>
			<TouchableOpacity style={styles.button} activeOpacity={0.8}>
				<Text style={styles.subtitle}>Upgrade now</Text>
			</TouchableOpacity>
			{DATA.map((item, index) => (
				<TouchableOpacity key={index} style={[Style.row, Style.top16]}>
					<Icon source={item.icon} size={sizes.s24} style={Style.right16} />
					<Text style={styles.subtitle}>{item.title}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default DrawerContent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(51, 51, 51, 0.9)',
		paddingTop: Device.setHeaderHeight(sizes.s30),
		paddingHorizontal: sizes.s24,
	},
	title: {
		alignSelf: 'center',
		textAlign: 'center',
		color: 'white',
		fontSize: sizes.s15,
		fontWeight: 'bold',
		marginTop: sizes.s8,
		marginBottom: sizes.s4,
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
});
