import { colors, screenWidth, sizes, strings, Style } from 'core/index';
import { format } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';
import React, { memo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface Props {
	type: string;
}

const ExampleScreen = (props: Props) => {
	const { type } = props || {};
	const renderItem = ({ index }: any) => {
		return (
			<View style={styles.viewItemExample}>
				<View key={index} style={styles.itemExample} />
			</View>
		);
	};
	const renderTime = () => {
		const time = format(new Date(), 'kk:mm');
		const date = format(new Date(), 'PPPP', {
			locale: strings.getLanguage() === 'vi' ? vi : enUS,
		});
		return (
			<View style={styles.viewDateTime}>
				<Text style={[Style.h2, Style.txtCenter, styles.txtBoldWhite]}>{time}</Text>
				<Text style={[Style.h6, Style.top4, Style.txtCenter, styles.txtBoldWhite]}>{date}</Text>
			</View>
		);
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
					{renderTime()}
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

export default memo(ExampleScreen);

const itemWidth = screenWidth / 8;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: sizes.s24,
		position: 'absolute',
		top: screenWidth * 0.4,
		bottom: 0,
		left: 0,
		right: 0,
	},
	viewItemExample: {
		flex: 1,
		alignSelf: 'center',
		alignItems: 'center',
	},
	itemExample: {
		backgroundColor: colors.gradient5,
		width: itemWidth,
		height: itemWidth,
		borderRadius: sizes.s8,
		marginVertical: sizes.s16,
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
	txtBoldWhite: {
		color: colors.white,
		fontWeight: 'bold',
	},
	viewDateTime: {
		alignItems: 'center',
	},
});
