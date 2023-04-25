import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { images } from 'assets';
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
			headerRight: () => <NavigationButton icon={images.ic_search} tintColor="white" />,
			headerLeft: () => <NavigationButton icon={images.ic_back} tintColor="white" />,
			headerTitleAlign: 'center',
			headerShadowVisible: false,
			headerTitleStyle: {
				color: 'white',
			},
			headerStyle: {
				backgroundColor: '#333333',
			},
		});
	}, []);

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					backgroundColor: '#333333',
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

export default TopTab;

const styles = StyleSheet.create({});
