import isEmpty from 'lodash/isEmpty'
import React, { useEffect } from 'react'

const StackComponent: React.FC<any> = ({ Component, ...navigatorProps }) => {
	// const { navigation, params } = navigatorProps
	// useEffect(() => {
	// 	if (!isEmpty(params?.options)) {
	// 		navigation.setOptions({
	// 			...params?.options,
	// 		})
	// 	}
	// }, [params?.options])
	return <Component {...navigatorProps} />
}

export default StackComponent
