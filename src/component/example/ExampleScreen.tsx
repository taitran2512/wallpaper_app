import { colors, screenWidth, sizes } from 'core/index';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface Props {
	type: string;
}

const ExampleScreen = (props: Props) => {
	const { type } = props || {};
	const renderItem = ({ index }: any) => {
		return <View key={index} style={styles.itemExample} />;
	};

	const renderType = () => {
		if (type === 'home') {
			return (
				<FlatList
					data={Array(20)}
					keyExtractor={keyExtractor}
					numColumns={4}
					style={styles.container}
					renderItem={renderItem}
				/>
			);
		} else if (type === 'lock') {
			return (
				<View style={styles.container}>
					<Text style={styles.textTime}>12:34</Text>
					<Text style={styles.textDay}>Ngày 24, tháng 4, năm 2023</Text>
					{Array(3)
						.fill(0)
						.map((item, index) => (
							<View key={index} style={styles.itemExample2} />
						))}
				</View>
			);
		} else {
			return null;
		}
	};
	const keyExtractor = (item: any, index: number) => index.toString();
	return <>{renderType()}</>;
};

export default ExampleScreen;
const styles = StyleSheet.create({
	container: {
		paddingHorizontal: sizes.s24,
	},
	itemExample: {
		backgroundColor: colors.gradient4,
		width: sizes.s60,
		height: sizes.s60,
		borderRadius: sizes.s8,
		marginVertical: sizes.s16,
		marginHorizontal: sizes.s16,
	},
	itemExample2: {
		backgroundColor: colors.gradient4,
		width: screenWidth * 0.9,
		height: sizes.s60,
		borderRadius: sizes.s8,
		marginVertical: sizes.s16,
	},
	textTime: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: sizes.s40,
		color: colors.white,
		marginBottom: sizes.s8,
	},
	textDay: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: sizes.s18,
		color: colors.white,
		marginBottom: sizes.s20,
	},
});
