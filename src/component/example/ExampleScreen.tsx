/* eslint-disable react-native/no-inline-styles */
import { BlurView } from '@react-native-community/blur';
import { images } from 'assets';
import { colors, screenWidth, sizes, strings, Style } from 'core/index';
import { format } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';
import React, { memo } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';

interface Props {
	type: string;
}

const ExampleScreen = (props: Props) => {
	const { type } = props || {};
	const renderItem = ({ index }: any) => {
		return (
			<View style={styles.viewItemExample}>
				<ImageBackground
					source={images.blur_view}
					resizeMode="cover"
					key={index}
					imageStyle={{ borderRadius: sizes.s8, overflow: 'hidden' }}
					style={styles.itemExample}>
					{/* <BlurView
						style={[StyleSheet.absoluteFill]}
						blurType="light"
						blurAmount={10}
						blurRadius={25}
						overlayColor=""
						reducedTransparencyFallbackColor="white"
					/> */}
				</ImageBackground>
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
							<ImageBackground
								key={index}
								resizeMode="cover"
								source={images.blur_view}
								style={styles.itemExample2}>
								<BlurView
									style={[StyleSheet.absoluteFill]}
									blurType="light"
									blurAmount={10}
									overlayColor="transparent"
									reducedTransparencyFallbackColor="white"
								/>
							</ImageBackground>
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
		overflow: 'hidden',
	},
	itemExample: {
		width: itemWidth,
		height: itemWidth,
		marginVertical: sizes.s16,
		overflow: 'hidden',
	},
	itemExample2: {
		width: screenWidth * 0.9,
		height: sizes.s60,
		borderRadius: sizes.s8,
		marginVertical: sizes.s16,
		overflow: 'hidden',
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
