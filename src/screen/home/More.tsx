import { images } from 'assets';
import { Style, screenHeight, screenWidth } from 'core/index';
import { TabScreenProps } from 'model';
import DrawerContent from 'navigation/homeStack/DrawerContent';
import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const More = ({ navigation }: TabScreenProps) => {
	useEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<View style={Style.flex}>
			<FastImage
				source={images.menu_background}
				style={[StyleSheet.absoluteFill, styles.background]}
			/>
			<DrawerContent />
		</View>
	);
};

export default More;

const styles = StyleSheet.create({
	background: {
		width: screenWidth,
		height: screenHeight,
	},
});
