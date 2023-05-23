/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import remoteConfig from '@react-native-firebase/remote-config';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { images } from 'assets';
import { Skeleton } from 'component';
import { colors, fonts, Navigator, screenHeight, sizes, strings, Style } from 'core';
import { TabScreenProps } from 'model';
import React, { memo, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { Category, DetailCategory, More } from 'screen/home';
import { Device } from 'utils';
import { keyBanner_category } from 'utils/GoogleAds';

const Tab = createBottomTabNavigator();

const BottomTab = ({ navigation }: TabScreenProps) => {
	const [bannerHome, setBannerHome] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const TabScreen = [
		{
			name: strings.popular,
			screen: DetailCategory,
			icon: images.ic_popular,
			icon_selected: images.ic_popular_selected,
		},
		{
			name: strings.category,
			screen: Category,
			icon: images.ic_category,
			icon_selected: images.ic_category_selected,
		},
		{
			name: strings.more,
			screen: More,
			icon: images.ic_more,
			icon_selected: images.ic_more_selected,
			options: {
				headerShown: false,
			},
		},
	];

	const getConfigRemote = () => {
		remoteConfig()
			.setDefaults({
				banner_home: false,
			})
			.then(() => remoteConfig()?.fetch(0))
			.then(() => remoteConfig()?.fetchAndActivate());
		const isBannerHome: any = remoteConfig()?.getValue('banner_home').asBoolean();
		setBannerHome(isBannerHome);
	};

	useEffect(() => {
		getConfigRemote();
	}, [bannerHome]);

	useEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	const renderTabScreen = () => {
		return TabScreen.map((tab, index: number) => (
			<Tab.Screen
				key={String(index)}
				name={tab.name}
				options={{
					...(Navigator.defaultOptions as any),
					lazy: false,
					tabBarInactiveTintColor: colors.white,
					tabBarActiveTintColor: colors.white,
					tabBarStyle: {
						height: sizes.s80 + Device.getBottomSpace(),
						backgroundColor: colors.background_black,
						paddingBottom: sizes.s16,
					},
					tabBarIndicatorStyle: {
						height: 2,
						backgroundColor: colors.white,
					},
					tabBarShowLabel: true,
					labelStyle: {
						fontSize: sizes.s14,
						fontFamily: fonts.bold,
						colors: colors.white,
					},
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<View>
							<Image source={focused ? tab.icon_selected : tab.icon} style={Style.icon24} />
						</View>
					),
					tabBarLabel: ({ focused }) => {
						return focused ? (
							<Text style={styles.txtFocus}>{tab.name}</Text>
						) : (
							<Text style={styles.noneFocus}>{tab.name}</Text>
						);
					},
				}}
				component={tab.screen}
			/>
		));
	};

	return (
		<View style={styles.container}>
			<Tab.Navigator>{renderTabScreen()}</Tab.Navigator>
			{bannerHome && (
				<View style={styles.viewBanner}>
					{loading && <Skeleton style={StyleSheet.absoluteFill} />}
					<BannerAd
						unitId={keyBanner_category}
						size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
						requestOptions={{
							requestNonPersonalizedAdsOnly: true,
						}}
						onAdLoaded={(e: any) => {
							if (e) {
								setLoading(false);
							}
						}}
						onAdFailedToLoad={(error) => {
							console.error('Advert failed to load: ', error);
						}}
					/>
				</View>
			)}
		</View>
	);
};

export default memo(BottomTab);
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	txtFocus: {
		fontSize: sizes.s12,
		fontFamily: fonts.bold,
		color: colors.white,
	},
	noneFocus: {
		fontSize: sizes.s12,
		color: colors.white,
		fontFamily: fonts.medium,
	},
	viewBanner: {
		height: screenHeight / 14.2,
	},
});
