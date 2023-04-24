import { colors, sizes, Style } from 'core';
import React from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	ScrollViewProps,
	View,
	ViewProps,
} from 'react-native';
import { Device } from 'utils';

interface Props extends ViewProps, ScrollViewProps {
	isFlex?: boolean;
	scrollable?: boolean;
	safeHeader?: boolean;
	safeFooter?: boolean;
	keyboardAvoiding?: boolean;
	keyboardOffset?: number;
	header?: any;
	footer?: any;
}

const Flex: React.FC<Props> = ({
	isFlex = true,
	scrollable,
	keyboardAvoiding = true,
	safeHeader = false,
	safeFooter = true,
	keyboardOffset,
	header,
	footer,
	...props
}) => {
	const Parent = keyboardAvoiding ? KeyboardAvoidingView : View;
	const Container = scrollable ? ScrollView : View;
	const keyboardVerticalOffset = Device.isIos ? keyboardOffset || sizes.s56 : 0;
	return (
		<Parent
			collapsable={false}
			style={[isFlex && Style.container]}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			keyboardVerticalOffset={keyboardVerticalOffset}>
			{safeHeader && <View style={{ height: Device.getStatusBarHeight() }} />}
			{header}
			<Container
				{...props}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}>
				{props.children}
			</Container>
			{footer}
			{safeFooter && (
				<View style={{ height: Device.getBottomSpace(), backgroundColor: colors.white }} />
			)}
		</Parent>
	);
};

export default Flex;
