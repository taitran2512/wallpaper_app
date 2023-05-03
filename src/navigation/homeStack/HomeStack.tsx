import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Navigator } from 'core';
import React, { memo, useCallback } from 'react';
import { enableScreens } from 'react-native-screens';
import * as HomeScreen from 'screen/home';
import DrawerContent from './DrawerContent';
import TopTab from './TopTab';

enableScreens();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack: React.FC = () => {
	const renderStackScreen = useCallback(() => {
		return Object.keys(HomeScreen).map((key: string, index: number) => (
			<Drawer.Screen
				key={String(index)}
				name={key}
				options={{ ...Navigator.defaultOptions, swipeEnabled: false }}
				component={(HomeScreen as any)[key]}
			/>
		));
	}, []);

	return (
		<Drawer.Navigator
			drawerContent={(props) => <DrawerContent {...props} />}
			screenOptions={{
				drawerStyle: {
					backgroundColor: 'transparent',
				},
			}}>
			<Drawer.Screen
				name="HomeDrawer"
				component={TopTab}
				options={{
					swipeEnabled: true,
				}}
			/>
			{renderStackScreen()}
		</Drawer.Navigator>
	);
};

export default memo(HomeStack);
