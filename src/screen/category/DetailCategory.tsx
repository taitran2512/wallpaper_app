/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */

import { images } from 'assets';
import { Flex, NavigationButton } from 'component';
import { sizes } from 'core/index';
import { ScreenProps } from 'model';
import React, { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Device } from 'utils';

const DetailCategory: React.FC<ScreenProps> = ({ navigation, route }) => {
	const iniScreen = () => {
		navigation.setOptions({
			headerShown: true,
			headerLeft: () => (
				<NavigationButton
					icon={images.ic_menu_left}
					tintColor="white"
					style={styles.iconHeader}
				/>
			),
			headerStyle: {
				height: Device.setHeaderHeight(sizes.s60),
			},
		});
	};
	useLayoutEffect(() => {
		iniScreen();
	}, []);

	return <Flex style={styles.container} />;
};

export default DetailCategory;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	iconHeader: {
		width: sizes.s24,
		height: sizes.s24,
	},
});
