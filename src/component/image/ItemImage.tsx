import { Skeleton } from 'component';
import { screenWidth, sizes } from 'core/index';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { imageSource } from 'utils';

const numColumns = 3;
const imageWidth = (screenWidth - sizes.s4) / numColumns;

const ItemImage = ({ onPress, url }: any) => {
	const [loading, setLoading] = useState<boolean>(true);

	return (
		<View
			style={{
				flex: 1 / numColumns,
				...styles.image,
			}}>
			{loading && <Skeleton style={StyleSheet.absoluteFill} />}

			<TouchableOpacity onPress={onPress} activeOpacity={0.8}>
				<FastImage
					style={styles.image}
					source={imageSource(url)}
					onLoadEnd={() => setLoading(false)}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default ItemImage;

const styles = StyleSheet.create({
	image: {
		width: imageWidth,
		height: (imageWidth / 9) * 16,
		marginBottom: sizes.s2,
	},
});
