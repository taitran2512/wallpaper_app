import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { Screens } from 'common';
import { screenOptionsStack } from 'common/nagivationOption';
import { Navigator } from 'core';
import React, { memo, useCallback } from 'react';
import { enableScreens } from 'react-native-screens';
import * as AuthenticationScreen from 'screen/authentication';

enableScreens();
const Stack = createStackNavigator();

const AuthenStack: React.FC<StackScreenProps<any>> = () => {
	const renderStackScreen = useCallback(() => {
		return Object.keys(AuthenticationScreen).map((key: string, index: number) => {
			return (
				<Stack.Screen
					key={String(index)}
					name={key}
					options={Navigator.defaultOptions}
					component={(AuthenticationScreen as any)[key]}
				/>
			);
		});
	}, []);

	return (
		<Stack.Navigator screenOptions={screenOptionsStack} initialRouteName={Screens.Login}>
			{renderStackScreen()}
		</Stack.Navigator>
	);
};

export default memo(AuthenStack);
