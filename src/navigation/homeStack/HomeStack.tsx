import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Navigator } from 'core';
import React, { memo, useCallback } from 'react';
import { enableScreens } from 'react-native-screens';
import * as HomeScreen from 'screen/home';
import TopTab from './TopTab';
import { createDrawerNavigator } from '@react-navigation/drawer';

enableScreens();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack: React.FC = () => {
	const renderStackScreen = useCallback(() => {
		return Object.keys(HomeScreen).map((key: string, index: number) => (
			<Stack.Screen
				key={String(index)}
				name={key}
				options={Navigator.defaultOptions}
				component={(HomeScreen as any)[key]}
			/>
		));
	}, []);

	const renderDrawer = () => (
		<Drawer.Navigator>
			<Drawer.Screen name="HomeDrawer" component={TopTab} />
		</Drawer.Navigator>
	);

	return (
		<Stack.Navigator>
			<Stack.Screen options={{ headerShown: false }} name={'HomeTab'} component={TopTab} />
			{renderStackScreen()}
		</Stack.Navigator>
	);
};

export default memo(HomeStack);
