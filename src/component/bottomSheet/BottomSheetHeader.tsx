import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { sizes, Style } from 'core';
import Icon from 'component/image/Icon';
import { BottomSheetProps } from 'model';

const BottomSheetHeader = (props: BottomSheetProps) => {
	const {
		onClose,
		iconLeft,
		iconRight,
		onPressIconLeft,
		onPressIconRight,
		title,
		closeOnPressIconRight = true,
		closeOnPressIconLeft = true,
	} = props || {};
	return (
		<View style={styles.header}>
			<Icon
				source={iconLeft}
				size={sizes.s20}
				style={{ padding: sizes.s6 }}
				onPress={() => {
					closeOnPressIconLeft ? onClose?.(onPressIconLeft) : onPressIconLeft?.(onClose);
				}}
			/>
			<Text style={[Style.txt16, Style.bold]}>{title}</Text>
			<Icon
				source={iconRight}
				size={sizes.s24}
				style={{ padding: sizes.s4 }}
				onPress={() => {
					closeOnPressIconRight ? onClose?.(onPressIconRight) : onPressIconRight?.(onClose);
				}}
			/>
		</View>
	);
};

export default BottomSheetHeader;

const styles = StyleSheet.create({
	header: {
		...Style.row_between,
		...Style.p10,
		...Style.borderBottom,
	},
});
