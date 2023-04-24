import { Animated, ViewStyle } from 'react-native'

export type WidthArrayType = number | string
export type AShapeType = 'circle' | 'square'
export type ASizeType = string | number | 'small' | 'large' | 'default'
export type PHeightType = string | number | Array<string | number>
export type PWidthType = string | number | Array<WidthArrayType>
export type TWidthType = string | number
export type THeightType = string | number
export type AnimationType = Animated.Value | Animated.ValueXY
export type ColorType = string
export const startAnimationHelper = (animation: AnimationType, duration: number) => {
	Animated.loop(
		Animated.sequence([
			Animated.timing(animation, {
				toValue: 1,
				duration,
				useNativeDriver: false,
			}),
			Animated.timing(animation, {
				toValue: 0,
				duration,
				useNativeDriver: false,
			}),
		])
	).start()
}

export const getInterpolatedColor = (
	animation: Animated.Value,
	primaryColor: ColorType,
	secondaryColor: ColorType
) =>
	animation.interpolate({
		inputRange: [0, 1],
		outputRange: [primaryColor, secondaryColor],
	})

export const paragraphInitialStyles: any = (
	index: number,
	pHeight: PHeightType,
	pWidth: PWidthType
) => {
	let height = pHeight
	let width = pWidth
	if (pWidth.constructor === Array) {
		width = pWidth[index] || '100%'
	}
	if (pHeight.constructor === Array) {
		height = pHeight[index] || 8
	}
	return {
		height,
		width,
	}
}
export interface CommonProps {
	/**
	 * The color of primary shade of the loader, can be rgba or hex color.
	 */
	primaryColor: string
	/**
	 * The color of secondary shade of the loader, can be rgba or hex color.
	 */
	secondaryColor: string
	/**
	 * Animation duration of the fade, default is 500.
	 */
	animationDuration: number
	/**
	 * If loading prop is used, it will render children when loading false.
	 * Usefull when you want to render something after loading finishes,
	 * just add something like loading={this.state.loading} and you can add your component as children.
	 */
	loading?: boolean | null
	/**
	 * Used to toggle animation,
	 * True - Animation enabled
	 * False - Animation disabled
	 */
	active?: boolean
	/**
	 * Enalbes or disables the title
	 */
	title?: boolean
	/**
	 * If you want to render the loaders in list, default is 1.
	 * If you provide more than one, it will render the loaders in a list.
	 */
	listSize: number
	/**
	 * Add addtional title styles.
	 */
	titleStyles?: ViewStyle
	/**
	 * Used to determine if avatar should be visible or not
	 */
	avatar?: boolean
	/**
	 * Used to determine the shape of avatar
	 * can be
	 * circle or square or if you want some kind of custamized shape, you can always overwrite avatarStyles
	 */
	aShape?: AShapeType
	/**
	 * The size of avatar, can be default, large, small or your custom number
	 */
	aSize: ASizeType
	/**
	 * Can be used to reverse the flow,
	 */
	reverse?: boolean
	/**
	 * If you want to add additional properties or overwrite the styles of the main container.
	 */
	containerStyles?: ViewStyle

	children?: any
}
export const commonDefaultProps: CommonProps = {
	primaryColor: 'rgba(234, 238, 244, 1)',
	secondaryColor: 'rgba(246, 248, 250, 0.71)',
	animationDuration: 800,
	loading: null,
	active: true,
	title: false,
	listSize: 1,
	titleStyles: {},
	avatar: false,
	aShape: 'circle',
	aSize: 'default',
	reverse: false,
	containerStyles: {},
}
