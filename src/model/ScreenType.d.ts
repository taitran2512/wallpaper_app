import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { StackNavigationOptions, StackScreenProps } from '@react-navigation/stack';
import { SelectCityProps } from 'component/customView/SelectCity';
import { SelectCountryProps } from 'component/customView/SelectCountry';
import { StyleProp, ViewStyle } from 'react-native';
import { BottomSheetProps, BottomSheetSwipeProps } from './Component';

export interface ScreenProps extends StackScreenProps<any> {}
export interface TabScreenProps extends BottomTabScreenProps<any> {}

export interface ScreenParams extends NavigateParams<any> {
	option?: StackNavigationOptions;
	screen?: string;
	params?: any;
}
export type NavigateParams<T> = {
	[Property in keyof T]: any;
};

// @ts-ignore
export interface ModalsParams extends AlertParams, BottomSheetProps, BottomSheetSwipeProps {
	type?: 'alert' | 'bottom' | 'bottom-swipe';
	backgroundColor?: string;
	closeOnTouchOutSide?: boolean;
}

export interface AlertParams {
	title?: string;
	content?: string;
	buttonSubmit?: string;
	buttonCancel?: string;
	onSubmit?: () => void;
	onCancel?: () => void;
}

export interface DialogProps extends SelectCountryProps, SelectCityProps {
	screen?: any;
	style?: StyleProp<ViewStyle>;
	options?: NativeStackNavigationOptions;
}
