import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { images } from 'assets';
import { screenOptionsStack } from 'common/nagivationOption';
import { NavigationButton } from 'component';
import { colors, sizes } from 'core/index';
import { ScreenProps } from 'model';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Category, New, Popular, Premium } from 'screen/home';

const Tab = createMaterialTopTabNavigator();

const TopTab = ({ navigation }: ScreenProps) => {
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
		navigation.setOptions({
			...screenOptionsStack,
			headerShown: true,
			title: DATA[0].title,
			headerRight: () => <NavigationButton icon={images.ic_search} tintColor="white" />,
			headerLeft: () => <NavigationButton icon={images.ic_back} tintColor="white" />,
			headerTitleAlign: 'center',
			headerShadowVisible: false,
			headerTitleStyle: {
				color: 'white',
			},
			headerStyle: {
				backgroundColor: colors.background_black,
			},
		});
	}, []);

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

const styles = StyleSheet.create({});
