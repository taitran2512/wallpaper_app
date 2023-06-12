/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import { colors, screenHeight, screenWidth } from 'core';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent,
	StyleProp,
	View,
	ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { imageSource } from 'utils';

interface Props {
	data: WallpaperType[];
	style?: StyleProp<ViewStyle>;
	index: number;
	onIndexChange?: (index: number) => void;
}

const SlideImage = forwardRef(({ data, style, index = 0, onIndexChange }: Props, ref: any) => {
	const listRef = useRef<FlatList>();
	const [idx, setIdx] = useState<number>(index);

	useEffect(() => {
		if (index) {
			listRef?.current?.scrollToOffset({ animated: false, offset: screenWidth * index });
		}
	}, [index]);

	useEffect(() => {
		onIndexChange?.(idx);
	}, [idx]);

	useImperativeHandle(ref, () => ({ currentIndex: idx }));

	const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		setIdx(Math.round(e.nativeEvent.contentOffset.x / screenWidth));
	};
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
				initialNumToRender={data.length}
				onScroll={onScroll}
				renderItem={({ item }) => {
					return (
						<FastImage
							source={imageSource(item?.media?.formats?.large?.url || item?.media?.url)}
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
});

export default SlideImage;
