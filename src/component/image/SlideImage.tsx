import { screenHeight, screenWidth } from 'core';
import React, { useEffect, useRef } from 'react';
import { FlatList, StyleProp, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { imageSource } from 'utils';

interface Props {
	data: any[];
	style?: StyleProp<ViewStyle>;
	index: number;
}

const SlideImage: React.FC<Props> = ({ data, style, index = 0 }) => {
	const listRef = useRef<FlatList>();
	useEffect(() => {
		if (!!index) {
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
				renderItem={({ item }) => {
					return (
						<FastImage
							source={imageSource(item)}
							style={[{ width: screenWidth, height: screenHeight }]}></FastImage>
					);
				}}
			/>
		</View>
	);
};

export default SlideImage;
