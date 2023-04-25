import { Screens } from 'common';
import { categoryData } from 'common/data';
import { Flex } from 'component';
import { colors, Navigator, sizes } from 'core/index';
import React, { memo } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Category = () => {
	const detailCategory = () => {
		Navigator.replace(Screens.DetailCategory, {});
	};

	const renderItem = ({ item }: any) => {
		return (
			<TouchableOpacity activeOpacity={0.8} onPress={detailCategory}>
				<ImageBackground
					source={item.background}
					style={styles.itemCategory}
					resizeMode="cover">
					<Text style={styles.itemTitle}>{item.name}</Text>
					<Text style={styles.itemSubTitle}>{item.lenght} wallpapers</Text>
				</ImageBackground>
			</TouchableOpacity>
		);
	};

	return (
		<Flex style={styles.container}>
			<FlatList
				data={categoryData}
				renderItem={renderItem}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
				keyExtractor={(e, index) => String(e?.id || index)}
			/>
		</Flex>
	);
};

export default memo(Category);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.backgroundApp,
	},
	itemCategory: {
		paddingVertical: sizes.s20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	itemTitle: {
		fontSize: sizes.s30,
		marginBottom: sizes.s4,
	},
	itemSubTitle: {
		fontSize: sizes.s18,
	},
});
