import { Style } from 'core/index';
import DrawerContent from 'navigation/homeStack/DrawerContent';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Menu = () => {
	return (
		<View style={Style.flex}>
			<DrawerContent />
		</View>
	);
};

export default Menu;

const styles = StyleSheet.create({});
