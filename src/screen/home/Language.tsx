/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { images } from 'assets';
import { Stacks } from 'common';
import { Languages } from 'common/data';
import { Buttons, Flex, Icon, NativeAds } from 'component';
import { Navigator, Style, colors, screenHeight, screenWidth, sizes, strings } from 'core/index';
import { ScreenProps } from 'model';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Device, Storage } from 'utils';
import { keyNative_onboarding } from 'utils/GoogleAds';

const Language: React.FC<ScreenProps | any> = ({ navigation }) => {
	const [language, setLanguage] = useState<string>('');

	useEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
		Storage.getData(Storage.key.language).then((lang) => {
			const appLanguage = lang || 'en';
			strings.setLanguage(appLanguage || 'en');
			setLanguage(appLanguage || 'en');
		});
	}, []);

	const setAppLanguage = (lan: string) => {
		setLanguage(lan);
		strings.setLanguage(lan);
		Storage.setData(Storage.key.language, lan);
	};

	const onSetLang = () => {
		Navigator.reset(Stacks.HomeStack);
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
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ flexGrow: 1 }}
						pagingEnabled
						scrollEventThrottle={16}>
						<View
							style={{
								width: screenWidth,
								paddingHorizontal: sizes.s16,
								paddingTop: Device.setHeaderHeight(sizes.s24),
							}}>
							<View style={Style.row_between}>
								<Text style={Style.h3}>{strings.language}</Text>
								<Icon source={images.ic_tick} size={sizes.s24} onPress={onSetLang} />
							</View>
							{Languages.map((item, index) => {
								return (
									<Buttons
										key={index}
										onPress={() => setAppLanguage(item.lang)}
										style={[Style.row_between, Style.top16, Style.ph16]}>
										<Text style={[Style.h6, { color: colors.white }]}>{item.name}</Text>
										<Icon
											source={
												language === item.lang
													? images.ic_checkbox_checked
													: images.ic_checkbox
											}
											size={sizes.s24}
										/>
									</Buttons>
								);
							})}
						</View>
					</ScrollView>

					<View
						style={[
							Style.row_center,
							Style.top24,
							{
								paddingBottom: sizes.s24,
							},
						]}
					/>
					<NativeAds
						loadOnMount={false}
						index={1}
						type="image"
						media={false}
						keys={keyNative_onboarding}
					/>
				</View>
			</LinearGradient>
		</Flex>
	);
};

export default Language;

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
	viewBanner: {
		marginHorizontal: sizes.s16,
		alignItems: 'center',
	},
});
