import { headerDefaultOptions } from 'common/nagivationOption'
import { isEmpty } from 'lodash'
import { ScreenProps } from 'model/ScreenType'

export const useNavigator = (props: ScreenProps) => {
	const { navigation, route } = props
	const params = route?.params || {}

	const options = isEmpty(params?.options) ? {} : params.options

	const defaultOptions = {
		...options,
		headerStyle: {
			...headerDefaultOptions.headerStyle,
			...options?.headerStyle,
		},
	}
	const newProps = {
		navigation,
		route: {
			...route,
			params: undefined,
		},
		params: {
			...params,
			options: defaultOptions,
		},
	}
	return {
		...newProps,
	}
}
