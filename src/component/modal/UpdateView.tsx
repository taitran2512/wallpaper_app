/* eslint-disable react-native/no-inline-styles */
import { colors, screenWidth, Style } from 'core';
import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

interface Props {
	visible: boolean;
	percent: string | number;
}
const UpdateView: React.FC<Props> = (props: Props) => {
	return (
		<Modal statusBarTranslucent transparent animationType="fade" visible={props.visible}>
			<View style={styles.container}>
				{/* <Image source={images.ic_downloading} style={styles.icon} /> */}
				<Text style={styles.title}>{'Downloading an update'}</Text>
				<View style={styles.outside}>
					<View
						style={[styles.inside, { backgroundColor: colors.blue, width: props.percent }]}
					/>
				</View>
				<Text style={[styles.title, { marginTop: 10 }]}>{props.percent}</Text>
			</View>
		</Modal>
	);
};

export default UpdateView;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		...Style.txt16_bold,
		marginBottom: 10,
		textAlign: 'center',
	},
	outside: {
		height: 10,
		borderRadius: 10,
		justifyContent: 'center',
		backgroundColor: colors.divider,
		marginHorizontal: 60,
	},
	inside: {
		borderRadius: 10,
		height: 8,
	},
	icon: {
		width: screenWidth * 0.5,
		height: screenWidth * 0.5,
		alignSelf: 'center',
	},
});
