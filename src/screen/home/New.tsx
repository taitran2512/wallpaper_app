import { dataDetailCategory } from 'common/data';
import { GridImageView } from 'component';
import { colors } from 'core/index';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { keyBanner_home } from 'utils/GoogleAds';

const New = () => {
	return <GridImageView data={dataDetailCategory} />;
};

export default New;
const styles = StyleSheet.create({
	viewBanner: {
		alignItems: 'center',
		backgroundColor: colors.background_black,
	},
});
