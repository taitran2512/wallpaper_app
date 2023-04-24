import { Style } from 'core'
import { isEmpty } from 'lodash'
import { ScreenProps } from 'model'
import React, { useEffect } from 'react'
import { View } from 'react-native'

const Dialog: React.FC<ScreenProps> = ({ navigation, route }) => {
	const { screen = <></>, style = {}, options = null } = route?.params || {}

	useEffect(() => {
		if (!isEmpty(options)) {
			navigation.setOptions(options)
		}
	}, [])
	const ScreenComponent = screen
	return (
		<View style={[Style.container, style]}>
			<ScreenComponent {...route.params} requestClose={() => navigation.goBack()} />
		</View>
	)
}

export default Dialog
