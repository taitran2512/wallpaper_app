import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenOptionsStack } from 'common/nagivationOption';
import { colors, Navigator } from 'core';
import React, { memo, useCallback } from 'react';
import { Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import * as HomeScreen from 'screen/home';
import BottomTab from './BottomTab';

enableScreens();
const Stack = createNativeStackNavigator();

const HomeStack: React.FC = () => {
	const renderStackScreen = useCallback(() => {
		SystemNavigationBar.stickyImmersive();
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
		<Stack.Navigator
			screenOptions={{
				customAnimationOnGesture: true,
				fullScreenGestureEnabled: true,
				gestureEnabled: true,
				animationTypeForReplace: 'push',
				animation: 'slide_from_right',
				presentation: Platform.OS === 'android' ? 'modal' : undefined,
			}}>
			<Stack.Screen
				name={'HomeTab'}
				component={BottomTab}
				options={{
					...screenOptionsStack,
					headerShown: true,
					headerTitleAlign: 'center',
					headerShadowVisible: false,
					headerStyle: {
						backgroundColor: colors.background_black,
					},
					animation: 'none',
				}}
			/>
			{renderStackScreen()}
		</Stack.Navigator>
	);
};

export default memo(HomeStack);
