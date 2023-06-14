/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';
import {
	createNativeStackNavigator,
	NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { images } from 'assets';
import { Stacks } from 'common';
import { NavigationBackButton } from 'component';
import { Navigator, sizes, Style } from 'core';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { Dialog, Modals } from 'screen/modal';
import { Onboarding } from 'screen/onboard';
import { AdsOpen, GoogleInterstitialsAdsSplash, LanguageSplash, Splash } from 'screen/splash';
import Device from 'utils/Device';
import HomeStack from './homeStack/HomeStack';

const Stack = createNativeStackNavigator();
enableScreens();

const screenOptionsNativeStack: NativeStackNavigationOptions = {
	headerShown: false,
	customAnimationOnGesture: true,
	fullScreenGestureEnabled: true,
	gestureEnabled: false,
	animationTypeForReplace: 'push',
	// animation: 'fade',
	// presentation: Platform.OS === 'android' ? 'modal' : undefined,
};

const AppStack: React.FC = () => {
	const insets = useSafeAreaInsets();
	Device.setDeviceInset(insets);

	return (
		<NavigationContainer
			ref={(ref) => Navigator.setNavigationRef(ref)}
			theme={{
				dark: false,
				colors: {
					background: 'transparent',
					primary: '',
					card: '',
					text: '',
					border: '',
					notification: '',
				},
			}}>
			<Stack.Navigator screenOptions={screenOptionsNativeStack}>
				<Stack.Screen name={Stacks.Splash} component={Splash} />
				<Stack.Screen name={Stacks.LanguageSplash} component={LanguageSplash} />
				<Stack.Screen name={Stacks.AdsOpen} component={AdsOpen} />
				<Stack.Screen
					name={Stacks.GoogleInterstitialsAdsSplash}
					component={GoogleInterstitialsAdsSplash}
				/>
				<Stack.Screen name={Stacks.Onboarding} component={Onboarding} />
				<Stack.Screen name={Stacks.HomeStack} component={HomeStack} />
				<Stack.Screen
					name={Stacks.Modals}
					component={Modals}
					options={{
						animation: 'fade',
						presentation: 'transparentModal',
						gestureEnabled: false,
						animationDuration: Navigator.animationDurationTime,
					}}
				/>
				<Stack.Screen
					name={Stacks.Dialog}
					component={Dialog}
					options={{
						animation: 'slide_from_right',
						gestureEnabled: false,
						animationDuration: 500,
						...(Navigator.defaultOptions as any),
						headerTitleStyle: Style.h6,
						headerLeft: () => (
							<NavigationBackButton
								icon={images.ic_back}
								style={{ paddingHorizontal: sizes.s8 }}
							/>
						),
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppStack;
