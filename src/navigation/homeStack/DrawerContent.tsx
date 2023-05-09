import { images } from 'assets';
import { Screens } from 'common';
import { screenOptionsStack } from 'common/nagivationOption';
import { Buttons, Icon } from 'component';
import { Navigator, Style, colors, sizes } from 'core/index';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DrawerContent = () => {
	const DATA = [
		// {
		// 	title: 'Home',
		// 	icon: images.ic_home,
		// },
		{
			title: 'Favourites',
			icon: images.ic_like,
			onPress: () => Navigator.navigate(Screens.Favorite),
		},
		{
			title: 'More app',
			icon: images.ic_category,
		},
		{
			title: 'Term and Conditions',
			icon: images.ic_term,
		},
		{
			title: 'Language',
			icon: images.ic_language,
			onPress: () => Navigator.navigate(Screens.Language),
		},
		{
			title: 'Privacy',
			icon: images.ic_lock,
		},
		// {
		// 	title: 'Rate us',
		// 	icon: images.ic_rate,
		// },
	];

	const renderBorderBottom = () => <View style={styles.border} />;

	return (
		<View style={styles.container}>
			<View style={{ height: sizes.s60, alignItems: 'center', justifyContent: 'center' }}>
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
