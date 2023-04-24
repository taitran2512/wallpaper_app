import * as HomeScreen from 'screen/home';
export const objScreen = { ...HomeScreen };

type Keys = typeof objScreen;

type ScreensType<T> = {
	[Property in keyof T]?: string;
};

export const Screens: ScreensType<Keys> = {};

export const Stacks = {
	AuthenStack: 'AuthenStack',
	HomeStack: 'HomeStack',
	Modals: 'Modals',
	Dialog: 'Dialog',
};
