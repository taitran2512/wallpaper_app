import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { Buttons, Flex } from 'component';
import { Navigator, colors, screenHeight, screenWidth, sizes } from 'core/index';

const Onboarding = () => {
	return (
		<Flex style={styles.container}>
			<FastImage
				source={{
					uri: 'https://wallpapers.com/images/featured/jfm7uaea6wor69c1.jpg',
				}}
				style={[StyleSheet.absoluteFill, styles.background]}
			/>
			<View style={styles.container}>
				<Text style={styles.title}>Wellcome to SuretDope Wallpapers</Text>
				<Text style={styles.subtitle}>
					Corem ipsum dolor sit amet, Nunc vulputate libero et amet
				</Text>
				<Buttons title="Next" onPress={() => Navigator.goHome()} />
			</View>
		</Flex>
	);
};

export default Onboarding;

const styles = StyleSheet.create({
	background: {
		width: screenWidth,
		height: screenHeight,
	},
	container: {
		justifyContent: 'flex-end',
		flex: 1,
		paddingBottom: sizes.s34,
		paddingHorizontal: sizes.s16,
	},
	title: {
		color: colors.white,
		fontSize: sizes.s30,
		textAlign: 'center',
		marginBottom: sizes.s48,
		lineHeight: sizes.s42,
		fontWeight: 'bold',
	},
	subtitle: {
		color: colors.white,
		fontSize: sizes.s18,
		textAlign: 'center',
		marginBottom: sizes.s64,
	},
});
