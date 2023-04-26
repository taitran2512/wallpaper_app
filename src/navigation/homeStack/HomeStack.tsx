import { createStackNavigator } from '@react-navigation/stack';
import { screenOptionsStack } from 'common/nagivationOption';
import { Navigator } from 'core';
import React, { memo, useCallback } from 'react';
import { enableScreens } from 'react-native-screens';
import * as HomeScreen from 'screen/home';
import TopTab from './TopTab';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

enableScreens();
const Stack = createNativeStackNavigator();

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

	return (
		<Stack.Navigator
			screenOptions={{
				animation: 'slide_from_right',
			}}>
			<Stack.Screen options={{ headerShown: false }} name={'HomeTab'} component={TopTab} />
			{renderStackScreen()}
		</Stack.Navigator>
	);
};

export default memo(HomeStack);
