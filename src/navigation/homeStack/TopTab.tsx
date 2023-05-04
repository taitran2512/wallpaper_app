/* eslint-disable react/no-unstable-nested-components */
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors, fonts, sizes } from 'core/index';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Category, New, Popular } from 'screen/home';

const Tab = createMaterialTopTabNavigator();

const TopTab = ({ navigation }: any) => {
	const DATA = [
		{
			name: 'New',
			compopnent: New,
			title: 'All',
		},
		{
			name: 'Category',
			compopnent: Category,
			title: 'Category',
		},
		{
			name: 'Popular',
			compopnent: Popular,
			title: 'Popular',
		},
	];

	// 	navigation.setOptions({
	// 		...screenOptionsStack,
	// 		headerShown: true,
	// 		headerLeft: () => (
	// 			<NavigationButton
	// 				onPress={() => {}}
	// 				icon={images.ic_menu_left}
	// 				tintColor="white"
	// 				style={{ width: sizes.s24, height: sizes.s24, marginLeft: sizes.s16 }}
	// 			/>
	// 		),
	// 		headerRight: () => (
	// 			<NavigationButton
	// 				icon={images.ic_search}
	// 				tintColor="white"
	// 				style={{ width: sizes.s20, height: sizes.s20, marginRight: sizes.s16 }}
	// 			/>
	// 		),

	// 		headerTitleAlign: 'center',
	// 		headerShadowVisible: false,
	// 		headerTitleStyle: {
	// 			color: 'white',
	// 		},
	// 		headerStyle: {
	// 			backgroundColor: colors.background_black,
	// 		},
	// 	});
	// }, [navigation]);

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarStyle: {
					backgroundColor: colors.background_black,
					elevation: 0,
					shadowOpacity: 0,
				},
				labelStyle: { fontSize: sizes.s14, fontFamily: fonts.bold },
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
			{DATA.map((item, index) => (
				<Tab.Screen
					key={String(index)}
					name={item.name}
					component={item.compopnent}
					listeners={{
						tabPress: () => navigation.setOptions({ title: item.title }),
					}}
				/>
			))}
		</Tab.Navigator>
	);
};

export default TopTab;
const styles = StyleSheet.create({
	txtFocus: {
		fontSize: sizes.s14,
		fontFamily: fonts.bold,
		fontWeight: 'bold',
		color: colors.white,
	},
	noneFocus: { fontSize: sizes.s14 },
});
