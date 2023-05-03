/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { images } from 'assets';
import { screenOptionsStack } from 'common/nagivationOption';
import { NavigationButton } from 'component';
import { colors, sizes } from 'core/index';
import { ScreenProps } from 'model';
import React, { useEffect } from 'react';
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

	useEffect(() => {
		// navigation.openDrawer();
		navigation.setOptions({
			...screenOptionsStack,
			headerShown: true,
			headerLeft: () => (
				<NavigationButton
					onPress={() => {
						navigation.toggleDrawer();
					}}
					icon={images.ic_menu_left}
					tintColor="white"
					style={{ width: sizes.s24, height: sizes.s24, marginLeft: sizes.s16 }}
				/>
			),
			headerRight: () => (
				<NavigationButton
					icon={images.ic_search}
					tintColor="white"
					style={{ width: sizes.s20, height: sizes.s20, marginRight: sizes.s16 }}
				/>
			),

			headerTitleAlign: 'center',
			headerShadowVisible: false,
			headerTitleStyle: {
				color: 'white',
			},
			headerStyle: {
				backgroundColor: colors.background_black,
			},
		});
	}, [navigation]);

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					backgroundColor: colors.background_black,
					elevation: 0,
					shadowOpacity: 0,
				},
				tabBarLabelStyle: {
					color: colors.white,
					textTransform: 'none',
					fontSize: sizes.s14,
				},
				tabBarActiveTintColor: colors.white,
				tabBarIndicatorStyle: {
					height: 2,
					backgroundColor: colors.white,
				},
			}}>
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
