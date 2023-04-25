/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { images } from 'assets';
import { NavigationButton } from 'component';
import { colors, sizes } from 'core/index';
import { ScreenProps } from 'model';
import React, { memo, useEffect } from 'react';
import { Category, New, Popular, Premium } from 'screen/home';

const Tab = createMaterialTopTabNavigator();

const TopTab = ({ navigation }: ScreenProps) => {
	const DATA = [
		{
			name: 'New',
			compopnent: New,
		},
		{
			name: 'Category',
			compopnent: Category,
		},
		{
			name: 'Popular',
			compopnent: Popular,
		},
		{
			name: 'Premium',
			compopnent: Premium,
		},
	];

	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerLeft: () => (
				<NavigationButton
					icon={images.ic_menu_left}
					tintColor="white"
					style={{ width: sizes.s24, height: sizes.s24 }}
				/>
			),
			headerRight: () => (
				<NavigationButton
					icon={images.ic_search}
					tintColor="white"
					style={{ width: sizes.s20, height: sizes.s20 }}
				/>
			),

			headerTitleAlign: 'center',
			headerShadowVisible: false,
			headerTitleStyle: {
				color: 'white',
			},
			headerStyle: {
				backgroundColor: colors.backgroundApp,
			},
		});
	}, []);

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					backgroundColor: colors.backgroundApp,
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
					options={{}}
				/>
			))}
		</Tab.Navigator>
	);
};

export default memo(TopTab);
