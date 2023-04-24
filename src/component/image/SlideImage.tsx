import { images } from 'assets';
import { colors, screenWidth, sizes, Style } from 'core';
import { MediaType } from 'model';
import React, { useEffect, useState } from 'react';
import {
	FlatList,
	StyleProp,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
	ViewStyle,
} from 'react-native';
import { ImageStyle } from 'react-native-fast-image';
import { URL } from 'utils/https';
import AutoFastImage from './AutoFastImage';
import Icon from './Icon';

interface Props {
	media: MediaType[] | any[];
	keyImage: keyof MediaType | string;
	keyType: string;
	onClearMedia?: (data: any) => void;
	width?: number;
	height?: number;
	containerStyle?: StyleProp<ViewStyle>;
	mediaStyle?: StyleProp<ImageStyle> | StyleProp<ViewStyle>;
	dotStyle?: StyleProp<ViewStyle>;
	showIconClose?: boolean;
}

const SlideImage: React.FC<Props> = ({
	media = [],
	keyType = 'mime',
	keyImage,
	width = screenWidth,
	height,
	onClearMedia = () => {},
	containerStyle,
	mediaStyle,
	dotStyle,
	showIconClose = false,
}) => {
	const [idx, setIdx] = useState<number>(0);
	const [mediaArr, setMediaArr] = useState<any[]>([]);

	const isSingleMedia = media?.length === 1;

	const getImageUrl = (img: string) => {
		if (!img) {
			return images.no_img;
		}
		return img?.includes('file://') ? img : URL + img;
	};

	useEffect(() => {
		const newArr = media.map((item: any) => {
			return {
				url: getImageUrl(item?.[keyImage]),
			};
		});
		setMediaArr([...newArr]);
	}, [media]);

	const renderDot = () => (
		<View style={[styles.dot_container, dotStyle]}>
			{media?.map((_, index) => (
				<View
					key={String(index)}
					style={[
						styles.dot,
						{
							backgroundColor: idx === index ? colors.orange : colors.white,
							marginLeft: index === 0 ? 0 : sizes.s6,
						},
					]}
				/>
			))}
		</View>
	);

	return (
		<View style={containerStyle}>
			<FlatList
				data={media}
				scrollEnabled={media?.length > 1}
				keyExtractor={(item) => 'key_' + item?.[keyImage]}
				horizontal
				nestedScrollEnabled
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onMomentumScrollEnd={(event) => {
					const index = Math.floor(
						Math.floor(event.nativeEvent.contentOffset.x) /
							Math.floor(event.nativeEvent.layoutMeasurement.width)
					);
					setIdx(index);
				}}
				renderItem={({ item, index }) => {
					if (item?.[keyType]?.includes('image')) {
						return (
							<TouchableWithoutFeedback>
								<AutoFastImage
									uri={getImageUrl(item?.[keyImage])}
									width={width}
									defaultHeight={isSingleMedia ? undefined : height}
									style={[Style.top16, mediaStyle as ImageStyle]}>
									{showIconClose && (
										<Icon
											source={images.ic_close}
											style={styles.btn_close}
											tintColor={colors.white}
											onPress={() => onClearMedia(item)}
										/>
									)}
								</AutoFastImage>
							</TouchableWithoutFeedback>
						);
					} else if (item?.[keyType]?.includes('video')) {
						return <></>;
					} else {
						return <></>;
					}
				}}
			/>
			{!isSingleMedia && renderDot()}
		</View>
	);
};

export default SlideImage;

const styles = StyleSheet.create({
	btn_close: {
		padding: sizes.s10,
		...Style.radius16,
		backgroundColor: 'rgba(10, 9, 25, 0.3)',
		position: 'absolute',
		top: sizes.s8,
		right: sizes.s8,
	},
	dot_container: {
		...Style.row_center,
		marginTop: -sizes.s16,
	},
	dot: {
		width: sizes.s6,
		height: sizes.s6,
		borderRadius: sizes.s6,
	},
});
