import { Style } from 'core'
import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'

interface Props {
	children: any
	style?: any
}
const KeyboardAvoiding: React.FC<Props> = (props: Props) => {
	return (
		<KeyboardAvoidingView
			style={[Style.container, props.style]}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
			{props.children}
		</KeyboardAvoidingView>
	)
}

export default KeyboardAvoiding
