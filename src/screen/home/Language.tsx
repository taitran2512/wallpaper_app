/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import remoteConfig from '@react-native-firebase/remote-config';
import { images } from 'assets';
import { Stacks } from 'common';
import { Languages } from 'common/data';
import { Flex, Icon, NativeAds } from 'component';
import { colors, Navigator, screenHeight, screenWidth, sizes, strings, Style } from 'core/index';
import { ScreenProps } from 'model';
import React, { useEffect, useState } from 'react';
import {
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { Device, Storage } from 'utils';
import { keyNative_onboarding } from 'utils/GoogleAds';

const Language: React.FC<ScreenProps | any> = ({ navigation }) => {
	const [language, setLanguage] = useState<string>('');
	const [optionsNativeAds, setOptionsNativeAds] = useState<boolean>(false);
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
		Navigator.replace(Stacks.HomeStack);
	};
	useEffect(() => {
		SystemNavigationBar.stickyImmersive();
		getConfigRemote();
	}, [optionsNativeAds]);
	const getConfigRemote = () => {
		remoteConfig()
			.setDefaults({
				native_language: false,
			})
			.then(() => remoteConfig()?.fetch(0))
			.then(() => remoteConfig()?.fetchAndActivate());
		const isNativeLanguage: any = remoteConfig()?.getValue('native_language').asBoolean();
		setOptionsNativeAds(isNativeLanguage);
	};
	return (
		<Flex style={styles.container}>
			<FastImage
				source={images.onboarding}
				style={[StyleSheet.absoluteFill, styles.background]}
			/>
			<View style={{ flex: 1 }}>
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
									<TouchableOpacity
										activeOpacity={0.8}
										key={index}
										style={[Style.ph16, Style.top16]}
										onPress={() => setAppLanguage(item.lang)}>
										<ImageBackground
											source={images.backgroun_btn_lang}
											style={[styles.button, Style.row_between, Style.ph16]}
											resizeMode="stretch">
											<Text style={[Style.h6, { color: colors.white }]}>
												{item.name}
											</Text>
											<Icon
												source={
													language === item.lang
														? images.ic_checkbox_checked
														: images.ic_checkbox
												}
												size={sizes.s24}
											/>
										</ImageBackground>
									</TouchableOpacity>
								);
							})}
						</View>
					</ScrollView>

					<View
						style={[
							Style.row_center,
							Style.top8,
							{
								paddingBottom: sizes.s24,
							},
						]}
					/>
					{optionsNativeAds && (
						<NativeAds
							loadOnMount={false}
							index={1}
							type="image"
							media={false}
							keys={keyNative_onboarding}
						/>
					)}
				</View>
			</View>
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
	button: {
		...Style.row,
		height: sizes.s50,
		flex: 0,
		marginHorizontal: -16,
	},
});
