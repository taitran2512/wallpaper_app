import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { ScreenProps } from 'model';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Navigator, colors, fonts, sizes } from 'core/index';
import { GridImageView, NavigationBackButton } from 'component';
import { dataDetailCategory } from 'common/data';
import { screenOptionsStack } from 'common/nagivationOption';

const Tab = createMaterialTopTabNavigator();
const Favorite = ({ navigation }: ScreenProps) => {
	useEffect(() => {
		navigation.setOptions({
			...screenOptionsStack,
			headerShown: true,
			title: 'Favorites',
			headerLeft: () => <NavigationBackButton tintColor="white" />,
			headerTitleAlign: 'center',
			headerShadowVisible: false,
		});
	}, []);

	const Like = () => <GridImageView data={dataDetailCategory} />;
	const Collection = () => <GridImageView data={dataDetailCategory} />;

	return (
		<Tab.Navigator
			backBehavior="none"
			screenOptions={({ route }) => ({
				tabBarStyle: {
					backgroundColor: colors.background_black,
					elevation: 0,
					shadowOpacity: 0,
				},
				labelStyle: { fontSize: sizes.s14, fontFamily: fonts.bold },
				tabBarInactiveTintColor: colors.white,
				tabBarActiveTintColor: colors.white,
				tabBarIndicatorStyle: {
					height: 2,
					backgroundColor: colors.white,
				},
				tabBarLabel: ({ focused }) => {
					return focused ? (
						<Text style={styles.txtFocus}>{route.name}</Text>
					) : (
						<Text style={styles.noneFocus}>{route.name}</Text>
					);
				},
			})}>
			<Tab.Screen name={'Like'} component={Like} />
			<Tab.Screen name={'Collection'} component={Collection} />
		</Tab.Navigator>
	);
};

export default Favorite;

const styles = StyleSheet.create({
	txtFocus: {
		fontSize: sizes.s15,
		fontFamily: fonts.bold,
		color: colors.white,
		flex: 1,
		width: '120%',
	},
	noneFocus: { fontSize: sizes.s15, color: colors.white, fontFamily: fonts.medium },
});
