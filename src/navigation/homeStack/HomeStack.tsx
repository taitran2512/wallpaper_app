import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenOptionsStack } from 'common/nagivationOption';
import { colors, Navigator } from 'core';
import React, { memo, useCallback } from 'react';
import { enableScreens } from 'react-native-screens';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import * as HomeScreen from 'screen/home';
import BottomTab from './BottomTab';

enableScreens();
const Stack = createNativeStackNavigator();

const HomeStack: React.FC = () => {
	const renderStackScreen = useCallback(() => {
		SystemNavigationBar.immersive();
		return Object.keys(HomeScreen).map((key: string, index: number) => (
			<Stack.Screen
				key={String(index)}
				name={key}
				options={{
					...Navigator.defaultOptions,
					...screenOptionsStack,
				}}
				component={(HomeScreen as any)[key]}
			/>
		));
	}, []);

	return (
		<Stack.Navigator>
			<Stack.Screen
				name={'HomeTab'}
				component={BottomTab}
				options={{
					...screenOptionsStack,
					headerShown: true,
					title: 'Popular',
					headerTitleAlign: 'center',
					headerShadowVisible: false,
					headerStyle: {
						backgroundColor: colors.background_black,
					},
				}}
			/>
			{renderStackScreen()}
		</Stack.Navigator>
	);
};

export default memo(HomeStack);
