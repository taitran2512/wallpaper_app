import { Screens } from 'common';
import { categoryData } from 'common/data';
import { Flex } from 'component';
import { colors, Navigator, sizes } from 'core/index';
import React, { memo } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { keyBanner_home } from 'utils/GoogleAds';

const Category = () => {
	const detailCategory = (item: any) => {
		Navigator.navigate(Screens.DetailCategory, { title: item.name || '' });
	};

	const renderItem = ({ item }: any) => {
		return (
			<TouchableOpacity activeOpacity={0.8} onPress={() => detailCategory(item)}>
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
			<View style={styles.viewBanner}>
				<BannerAd
					unitId={keyBanner_home}
					size={BannerAdSize.BANNER}
					requestOptions={{
						requestNonPersonalizedAdsOnly: true,
					}}
					onAdLoaded={() => {
						console.log('Advert loaded');
					}}
					onAdFailedToLoad={(error) => {
						console.error('Advert failed to load: ', error);
					}}
				/>
			</View>
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
		fontWeight: '500',
		color: colors.white,
	},
	itemSubTitle: {
		fontSize: sizes.s18,
		color: colors.white,
	},
	viewBanner: {
		alignItems: 'center',
	},
});
