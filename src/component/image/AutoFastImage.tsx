import { useImageDimensions } from 'hook/useImageDimensions'
import { isEqual } from 'lodash'
import React, { memo } from 'react'
import FastImage, { FastImageProps } from 'react-native-fast-image'
import Loader from '../loader/Loader'

interface Props extends FastImageProps {
	width?: number
	defaultHeight?: number
	uri?: string
}

const AutoFastImage: React.FC<Props> = ({ uri = '', width = 100, defaultHeight, ...props }) => {
	const imageDimension = useImageDimensions({
		uri: uri,
	})
	const height = (width || 0) / (imageDimension?.dimensions?.aspectRatio || 1)

	return imageDimension.loading ? (
		<Loader
			pHeight={defaultHeight || height || width / 2}
			pWidth={width}
			paragraphStyles={props?.style as any}
		/>
	) : (
		<FastImage
			{...props}
			style={[{ width, height: defaultHeight || height }, props?.style]}
			source={{ uri }}
		/>
	)
}

export default memo(AutoFastImage, isEqual)
