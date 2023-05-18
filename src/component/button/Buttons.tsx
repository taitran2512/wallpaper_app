/* eslint-disable react-native/no-inline-styles */
import { BlurView } from '@react-native-community/blur';
import { colors, sizes } from 'core/index';
import React, { memo } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface Props {
	title?: string;
	onPress?: () => void;
	children?: any;
	style?: StyleProp<ViewStyle>;
	blurStyle?: StyleProp<ViewStyle>;
}

const Buttons: React.FC<Props> = ({ title, onPress, children, blurStyle, style }) => {
	return (
		<TouchableOpacity
			activeOpacity={children ? 1 : 0.8}
			onPress={onPress}
			style={[styles.container, style]}>
			<BlurView
				style={[
					{
						overflow: 'hidden',
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
					},
					blurStyle,
				]}
				blurType="light"
				blurAmount={10}
				blurRadius={20}
				overlayColor="transparent"
			/>
			{children || <Text style={styles.title}>{title}</Text>}
		</TouchableOpacity>
	);
};

export default memo(Buttons);

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		height: sizes.s50,
		borderRadius: sizes.s10,
		overflow: 'hidden',
		borderColor: 'rgba(255, 255, 255, 0.5)',
		borderLeftWidth: 0.6,
		borderTopWidth: 0.6,
	},
	title: {
		color: colors.white,
		fontWeight: 'bold',
		fontSize: sizes.s18,
	},
});
