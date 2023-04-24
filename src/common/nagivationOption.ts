import { StackNavigationOptions, TransitionPresets } from '@react-navigation/stack'
import { colors } from 'core/style/colors'
import sizes from 'core/size/sizes'
import { Device } from 'utils'

export const defaultHeaderHeight = Device.setHeaderHeight(sizes.s50)

export const headerDefaultOptions: any = {
	headerStyle: {
		height: defaultHeaderHeight,
		elevation: 0, // remove shadow on Android
		shadowOpacity: 0, // remove shadow on iOS
	},
}

export const screenOptionsStack: StackNavigationOptions = {
	presentation: 'modal',
	gestureEnabled: true,
	...TransitionPresets.SlideFromRightIOS,
	cardStyle: {
		backgroundColor: colors.white,
	},
	...headerDefaultOptions,
}
