/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { images } from 'assets';
import { Navigator, Style, colors, fonts, sizes, strings } from 'core';
import { TabScreenProps } from 'model';
import React, { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Category, More, Popular } from 'screen/home';
import { Device } from 'utils';

const Tab = createBottomTabNavigator();

const BottomTab = ({ navigation }: TabScreenProps) => {
	const TabScreen = [
		{
			name: strings.popular,
			screen: Popular,
			icon: images.ic_popular,
			icon_selected: images.ic_popular_selected,
		},
		{
			name: strings.category,
			screen: Category,
			icon: images.ic_category,
			icon_selected: images.ic_category_selected,
		},
		{
			name: strings.more,
			screen: More,
			icon: images.ic_menu,
			icon_selected: images.ic_menu_selected,
			options: {
				headerShown: false,
			},
		},
	];

	const renderTabScreen = () => {
		return TabScreen.map((tab, index: number) => (
			<Tab.Screen
				key={String(index)}
				name={tab.name}
				listeners={{
					tabPress: () => {
						navigation.setOptions({
							title: tab.name,
							headerShown: true,
							...tab.options,
						});
					},
				}}
				options={{
					...(Navigator.defaultOptions as any),
					lazy: false,
					tabBarInactiveTintColor: colors.white,
					tabBarActiveTintColor: colors.white,
					tabBarStyle: {
						height: sizes.s80 + Device.getBottomSpace(),
						backgroundColor: colors.background_black,
						paddingBottom: sizes.s16,
					},
					tabBarIndicatorStyle: {
						height: 2,
						backgroundColor: colors.white,
					},
					tabBarShowLabel: true,
					labelStyle: {
						fontSize: sizes.s14,
						fontFamily: fonts.bold,
						colors: colors.white,
					},
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<View>
							<Image source={focused ? tab.icon_selected : tab.icon} style={Style.icon24} />
						</View>
					),
					tabBarLabel: ({ focused }) => {
						return focused ? (
							<Text style={styles.txtFocus}>{tab.name}</Text>
						) : (
							<Text style={styles.noneFocus}>{tab.name}</Text>
						);
					},
				}}
				component={tab.screen}
			/>
		));
	};

	return <Tab.Navigator>{renderTabScreen()}</Tab.Navigator>;
};

export default memo(BottomTab);
const styles = StyleSheet.create({
	txtFocus: {
		fontSize: sizes.s12,
		fontFamily: fonts.bold,
		color: colors.white,
	},
	noneFocus: {
		fontSize: sizes.s12,
		color: colors.white,
		fontFamily: fonts.medium,
	},
});