/* eslint-disable @typescript-eslint/no-shadow */
import { colors, screenHeight, screenWidth } from 'core';
import React, { useEffect, useRef } from 'react';
import { FlatList, StyleProp, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { imageSource } from 'utils';

interface Props {
	data: WallpaperType[];
	style?: StyleProp<ViewStyle>;
	index: number;
}

const SlideImage: React.FC<Props> = ({ data, style, index = 0 }) => {
	const listRef = useRef<FlatList>();
	useEffect(() => {
		if (index) {
			listRef?.current?.scrollToOffset({ animated: false, offset: screenWidth * index });
		}
	}, [index]);
	return (
		<View style={style}>
			<FlatList
				ref={listRef as any}
				data={data}
				keyExtractor={(item, index) => 'key_' + index}
				horizontal
				nestedScrollEnabled
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				initialNumToRender={20}
				renderItem={({ item }) => {
					console.log(imageSource(item?.media?.url), 'imageSource(item?.media?.url)');
					return (
						<FastImage
							source={imageSource(item?.media?.url)}
							style={[
								{
									width: screenWidth,
									height: screenHeight,
									backgroundColor: colors.backgroundApp,
								},
							]}
						/>
					);
				}}
			/>
		</View>
	);
};

export default SlideImage;
