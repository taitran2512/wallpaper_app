import { StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';
import { fonts, sizes } from 'core';
import { Device } from 'utils';

export const defaultHeaderHeight = Device.setHeaderHeight(sizes.s60);

export const headerDefaultOptions: any = {
	headerStyle: {
		height: defaultHeaderHeight,
		elevation: 0, // remove shadow on Android
		shadowOpacity: 0, // remove shadow on iOS
	},
};

export const screenOptionsStack: StackNavigationOptions | any = {
	presentation: 'modal',
	gestureEnabled: true,
	...TransitionPresets.SlideFromRightIOS,
	cardStyle: {
		backgroundColor: 'rgba(51, 51, 51, 0.8)',
	},
	...headerDefaultOptions,
	headerTitleStyle: {
		color: 'white',
		fontFamily: fonts.bold,
	},
};
