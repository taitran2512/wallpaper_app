import { Flex } from 'component';
import { colors } from 'core/index';
import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';

const Category = () => {
	return (
		<Flex style={styles.container}>
			<Text>Category</Text>
		</Flex>
	);
};

export default memo(Category);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.backgroundApp,
	},
});
