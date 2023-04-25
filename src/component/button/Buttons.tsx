import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { Style, colors, sizes } from 'core/index';
import { BlurView } from '@react-native-community/blur';

interface Props {
	title?: string;
	onPress?: () => void;
	children?: any;
}

const Buttons: React.FC<Props> = ({ title, onPress, children }) => {
	return (
		<BlurView blurType="light" blurAmount={3} reducedTransparencyFallbackColor="white">
			<TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.container}>
				{children || <Text style={styles.title}>{title}</Text>}
			</TouchableOpacity>
		</BlurView>
	);
};   

export default Buttons;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		height: sizes.s50,
		borderRadius: sizes.s16,
	},
	title: {
		color: colors.white,
		fontWeight: 'bold',
		fontSize: sizes.s18,
	},
});
