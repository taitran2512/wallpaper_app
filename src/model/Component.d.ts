import { FastImageProps } from 'react-native-fast-image';
import { StyleProp, TextInputProps, ViewStyle } from 'react-native/types';
import { DatePickerProps } from '../component/datePicker/DatePicker';

export interface InputProps extends TextInputProps {
	style?: StyleProp<ViewStyle>;
	inputStyle?: StyleProp<ViewStyle>;
	inputContainerStyle?: StyleProp<ViewStyle>;
	label?: string;
	iconRight?: FastImageProps['source'];
	iconLeft?: FastImageProps['source'];
	onPressIconRight?: () => void;
	onPressIconLeft?: () => void;
	isPassword?: boolean;
	isPicker?: boolean;
	onPress?: () => void;
	isDatePicker?: boolean;
	onChangeDate?: (data: { date: string | Date; dateString: string }) => void;
	datePickerProps?: DatePickerProps;
}

export interface InputState {
	isFocused: boolean;
	isHidePassword?: boolean;
}

export interface BottomSheetProps {
	screen?: any;
	title?: string;
	ref?: any;
	showHeader?: boolean;
	style?: StyleProp<ViewStyle>;
	onClose?: (callback?: any) => void;
	title?: string;
	iconRight?: FastImageProps['source'];
	iconLeft?: FastImageProps['source'];
	onPressIconRight?: (requestClose?: any) => void;
	onPressIconLeft?: (requestClose?: any) => void;
	closeOnPressIconRight?: boolean;
	closeOnPressIconLeft?: boolean;
	closeOnTouchOutSide?: boolean;
}

export interface BottomSheetSwipeProps {
	screen?: any;
	draggable?: boolean;
	height?: number;
	onClose?: (callback?: () => void) => void;
	isShowButton?: boolean;
	buttonTitle?: string;
	buttonOnPress?: () => void;
	closeOnTouchOutSide?: boolean;
}

export interface ChooseTaskBoardProps {
	onPressBoard: (data: any) => void;
	requestClose?: () => void;
	data: ListBoardType[];
}

export interface ChooseTaskListProps {
	requestClose?: () => void;
	data?: ListByBoardType['content'];
	onPress?: (data?: ItemListByBoardType) => void;
}

export interface ItemNoticationProps {
	title: string;
	date: string | Date;
	isRead: boolean;
}

export interface ItemCommentProps {
	avatar?: string;
	username?: string;
	date?: string | Date;
	content?: string;
	isReply?: boolean;
}

export interface PopUpActionProps {
	closeOntouch?: boolean; // auto close popup when press any item
	requestClose?: (callback?: () => void) => void;
	keyTitle?: string;
	keyIcon?: string;
	data: {
		icon?: any;
		title?: string | any;
		onPress?: (data?: any) => void;
		titleColor?: string;
		closeOntouchItem?: boolean; // auto close popup when press each item
		isShow?: boolean;
		[key: string]: any;
	}[];
	onPress?: (data?: any) => void;
}
