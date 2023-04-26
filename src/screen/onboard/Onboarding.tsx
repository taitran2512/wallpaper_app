import {
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import FastImage from 'react-native-fast-image';
import { Buttons, Flex } from 'component';
import { Navigator, Style, colors, screenHeight, screenWidth, sizes } from 'core/index';
import { images } from 'assets';
import LinearGradient from 'react-native-linear-gradient';

const WelcomArr = [
	{
		title: 'Wellcome to SuretDope Wallpapers',
		content: 'Corem ipsum dolor sit amet, Nunc vulputate libero et amet',
	},
	{
		title: 'Wellcome to SuretDope Wallpapers',
		content: 'Corem ipsum dolor sit amet, Nunc vulputate libero et amet',
	},
	{
		title: 'Wellcome to SuretDope Wallpapers',
		content: 'Corem ipsum dolor sit amet, Nunc vulputate libero et amet',
	},
];

const Onboarding = () => {
	const [idx, setIdx] = useState<number>(0);
	const scrollRef = useRef<any>();

	const onPressNext = () => {
		const page = idx + 1;
		setIdx(page);
		if (page === WelcomArr.length) {
			Navigator.goHome();
		} else {
			scrollRef.current.scrollTo({ x: screenWidth * page });
		}
	};

	const renderPage = () => {
		return WelcomArr.map((item, index) => (
			<View key={String(index)} style={styles.page}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.subtitle}>{item.content} </Text>
			</View>
		));
	};

	const renderDot = () => {
		return WelcomArr.map((item, index) => (
			<View
				key={String(index)}
				style={[Style.right6, index === idx ? styles.dot_active : styles.dot]}
			/>
		));
	};

	return (
		<Flex style={styles.container}>
			<FastImage
				source={images.onboarding}
				style={[StyleSheet.absoluteFill, styles.background]}
			/>
			<LinearGradient
				style={{ flex: 1 }}
				colors={[
					'rgba(0, 0, 0, 0.01)',
					'rgba(0, 0, 0, 0.2)',
					'rgba(0, 0, 0, 0.5)',
					'rgba(0, 0, 0, 0.7)',
				]}>
				<View style={styles.container}>
					<ScrollView
						ref={scrollRef}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ flexGrow: 1 }}
						pagingEnabled
						scrollEventThrottle={16}
						scrollEnabled={false}>
						{renderPage()}
					</ScrollView>
					<Buttons title="Next" onPress={onPressNext} style={Style.mh16} />
					<View
						style={[
							Style.row_center,
							Style.top24,
							{
								paddingBottom: sizes.s34,
							},
						]}>
						{renderDot()}
					</View>
				</View>
			</LinearGradient>
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
	page: {
		width: screenWidth,
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingHorizontal: sizes.s16,
	},
	dot: {
		width: sizes.s6,
		height: sizes.s6,
		borderRadius: sizes.s4,
		backgroundColor: '#999999',
	},
	dot_active: {
		width: sizes.s6,
		height: sizes.s6,
		borderRadius: sizes.s4,
		backgroundColor: colors.white,
	},
});
