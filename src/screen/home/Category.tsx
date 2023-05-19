/* eslint-disable react-hooks/exhaustive-deps */
import { incrementCategoryAction } from 'action/appAction';
import WallpaperApi from 'api/WallpaperApi';
import { Screens } from 'common';
import { Flex } from 'component';
import { colors, fonts, Navigator, sizes, strings, Style } from 'core/index';
import { TabScreenProps } from 'model';
import React, { memo, useEffect, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { countCategory } from 'selector/appSelector';
import { keyInterstitialOpenCate, keyInterstitialOpenCateHigh } from 'utils/GoogleAds';
import { IMAGE_URL } from 'utils/Https';

const Category = ({ navigation }: TabScreenProps) => {
	const count = useSelector(countCategory);
	const dispatch = useDispatch();
	const [dataCate, setDataCate] = useState<CategoryType[]>([]);
	useEffect(() => {
		getCategoryData();
		navigation.setOptions({
			headerShown: true,
			title: strings.category,
			headerLeft: undefined,
			headerTitleStyle: {
				color: 'white',
				fontFamily: fonts.bold,
				fontSize: sizes.s18,
			},
		});
	}, []);

	const getCategoryData = async () => {
		try {
			const reponse = await WallpaperApi.getCategory();
			if (reponse.data) {
				setDataCate(reponse?.data);
			}
		} catch (error) {
			setDataCate([]);
		}
	};

	const detailCategory = (item: CategoryType) => {
		dispatch(incrementCategoryAction());
		Navigator.navigate(Screens.DetailCategory, { categoryName: item?.name });
		if (count % 2 !== 0) {
			Navigator.navigate(Screens.GoogleInterstitialsAds, {
				key: keyInterstitialOpenCateHigh,
				key2: keyInterstitialOpenCate,
				type: 'category_high',
			});
		}
	};

	const renderItem = ({ item }: { item: CategoryType }) => {
		return (
			<TouchableOpacity activeOpacity={0.8} onPress={() => detailCategory(item)}>
				<ImageBackground
					source={{ uri: IMAGE_URL + item?.thumbnail?.url }}
					style={styles.itemCategory}
					resizeMode="cover">
					<Text style={styles.itemTitle}>{item.name}</Text>
					<Text style={styles.itemSubTitle}>{item.image_count || 0} wallpapers</Text>
				</ImageBackground>
			</TouchableOpacity>
		);
	};
	if (!dataCate.length) {
		return (
			<View style={styles.viewLoading}>
				<ActivityIndicator color={colors.gradient} size="large" />
			</View>
		);
	}
	return (
		<Flex style={styles.container}>
			<FlatList
				data={dataCate}
				renderItem={renderItem}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
				keyExtractor={(e, index) => String(index)}
				initialNumToRender={20}
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
	viewLoading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.backgroundApp,
	},
	itemCategory: {
		paddingVertical: sizes.s20,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: sizes.s2,
		marginHorizontal: sizes.s2,
	},
	itemTitle: {
		...Style.txt28,
		marginBottom: sizes.s4,
	},
	itemSubTitle: {
		...Style.txt16_white,
	},
	viewBanner: {
		alignItems: 'center',
	},
});
