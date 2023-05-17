import { incrementCategoryAction } from 'action/appAction';
import { Screens } from 'common';
import { categoryData } from 'common/data';
import { Flex } from 'component';
import { Navigator, colors, sizes } from 'core/index';
import React, { memo, useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { countCategory } from 'selector/appSelector';
import { keyInterstitialOpenCate, keyInterstitialOpenCateHigh } from 'utils/GoogleAds';

const Category = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const count = useSelector(countCategory);
	const dispatch = useDispatch();

	useEffect(() => {
		const timeOut = setTimeout(() => {
			setLoading(false);
		}, 1500);
		return () => {
			clearTimeout(timeOut);
		};
	}, []);

	const detailCategory = (item: any) => {
		dispatch(incrementCategoryAction());
		Navigator.navigate(Screens.DetailCategory, { title: item.name || '' });
		if (count % 2 !== 0) {
			Navigator.navigate(Screens.GoogleInterstitialsAds, {
				key: keyInterstitialOpenCateHigh,
				key2: keyInterstitialOpenCate,
				type: 'category_high',
			});
			return;
		}
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
			{/* <View style={styles.viewBanner}>
				{loading ? (
					<ActivityIndicator color={colors.blue} size="large" />
				) : (
					<BannerAd
						unitId={keyBanner_category}
						size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
						requestOptions={{
							requestNonPersonalizedAdsOnly: true,
						}}
						onAdLoaded={(e) => console.log(e)}
						onAdFailedToLoad={(error) => {
							console.error('Advert failed to load: ', error);
						}}
					/>
				)}
			</View> */}
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
