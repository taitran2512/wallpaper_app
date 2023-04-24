import { images } from 'assets'
import { colors, fonts, sizes, Style } from 'core'
import React from 'react'
import {
	Animated,
	Image,
	ImageSourcePropType,
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	TouchableOpacity,
	View,
} from 'react-native'

const BASE_SIZE = sizes.s16 //text size
const VIEW_HEIGHT = sizes.s56 //chiều cao của view tổng
const ICON_SIZE = sizes.s24
interface State {
	isFocused: boolean
	hidePassword: boolean
	labelHeight: number
	error: boolean
	message: string
	value: string | undefined
}
interface Props extends TextInputProps {
	value?: string
	label?: string
	disabled?: boolean
	isRequired?: boolean
	isPassword?: boolean
	isPicker?: boolean
	inputStyle?: any
	styleLabel?: any
	style?: any
	icon?: ImageSourcePropType
	iconLeft?: ImageSourcePropType
	iconRight?: ImageSourcePropType | any
	errorMessage?: string
	onFocus?: () => void
	onBlur?: () => void
	onChangeText?: (text: string) => void
	onPress?: () => void
	onPressIconLeft?: () => void
	onPressIconRight?: () => void
	keyboardType?: any
	maxLength?: number
	iconRightColor?: string
}
export default class TextInputAnimated extends React.PureComponent<Props, State> {
	static defaultProps = {
		value: '',
		onPress: () => {},
		onFocus: () => {},
		onBlur: () => {},
		onClear: () => {},
		onChangeText: () => {},
		onPressIconRight: () => {},
	}
	textInput: any
	_animatedIsFocused: any
	constructor(props: Props) {
		super(props)
		this.state = {
			isFocused: false,
			hidePassword: true,
			labelHeight: 0,
			error: false,
			message: '',
			value: this.props.value || '',
		}
		this.textInput = React.createRef()
		this._animatedIsFocused = new Animated.Value(!this.props.value ? 0 : 1)
	}
	showError = (message = '') => {
		this.setState({ error: true, message })
	}
	hideError = () => {
		this.setState({ error: false, message: '' })
	}
	handleFocus = () => {
		this.setState({ isFocused: true }, () => {
			this.props?.onFocus?.()
		})
	}

	handleBlur = () => {
		this.setState({ isFocused: false }, () => this.props?.onBlur?.())
	}

	focus = () => {
		this.textInput.current.focus()
	}

	blur = () => {
		this.textInput.current.blur()
	}
	setValue = (value: string) => {
		this.setState({ value: value })
	}

	getValue = () => {
		return this.state.value
	}

	componentDidUpdate(prevProps: any, prevState: any) {
		if (this.state.isFocused !== prevState.isFocused || this.state.value !== prevState.value) {
			if (this.state.error || this.state.message !== '') {
				this.setState({ error: false, message: '' })
			}
			Animated.timing(this._animatedIsFocused, {
				toValue: this.state.isFocused || this.state.value !== '' ? 1 : 0,
				duration: 150,
				useNativeDriver: false,
			}).start()
		}
		if (this.props.value !== prevProps.value) {
			this.setState({ value: this.props.value })
		}
	}

	onChangeText = (txt: string) => {
		this.setState({ value: txt }, () => this.props.onChangeText?.(txt))
	}

	onClear = () => {
		this.setState({ value: '' }, () => this.props.onChangeText?.(''))
	}

	getStyleError() {
		const { error } = this.state
		const { iconRightColor } = this.props
		return {
			icon: {
				tintColor: error ? colors.error : iconRightColor || colors.secondary_text,
			},
			textInput: {
				color: error ? colors.error : colors.title,
			},
		}
	}

	// component
	text = () => (
		<Text
			style={[
				styles.textInput,
				{ color: colors.title },
				this.props.inputStyle,
				this.props.iconRight && { right: ICON_SIZE * 2 },
				this.props.iconLeft && { left: ICON_SIZE * 2 },
			]}>
			{String(this.state.value)}
		</Text>
	)

	textInputs = () => (
		<TextInput
			{...this.props}
			ref={this.textInput}
			autoCorrect={false}
			autoComplete="off"
			maxLength={this.props.maxLength}
			editable={!this.props.disabled && !this.props.isPicker}
			style={[
				styles.textInput,
				{ color: colors.title },
				this.props.inputStyle,
				this.props.iconRight && { right: ICON_SIZE * 2 },
				this.props.iconLeft && { left: ICON_SIZE * 2 },
				this.getStyleError().textInput,
			]}
			value={this.state.value}
			onChangeText={this.onChangeText}
			onFocus={this.handleFocus}
			onBlur={this.handleBlur}
			blurOnSubmit
		/>
	)

	textPassword = () => (
		<TextInput
			ref={this.textInput}
			value={this.props.value}
			style={[
				styles.textInput,
				{ color: colors.title, right: ICON_SIZE * 2 },
				this.props.iconLeft && { left: ICON_SIZE * 2 },
				this.props.inputStyle,
				this.getStyleError().textInput,
			]}
			secureTextEntry={this.state.hidePassword}
			onChangeText={this.onChangeText}
			onFocus={this.handleFocus}
			onBlur={this.handleBlur}
			blurOnSubmit
			textContentType={'newPassword'}
		/>
	)

	iconRight = () => {
		if (this.props.iconRight) {
			return (
				<TouchableOpacity
					activeOpacity={1}
					style={styles.right}
					onPress={this.props.onPressIconRight}>
					<Image
						style={[styles.icon24, this.getStyleError().icon]}
						source={this.props.iconRight}
					/>
				</TouchableOpacity>
			)
		}
		return null
	}

	iconLeft = () => {
		if (this.props.iconLeft) {
			return (
				<TouchableOpacity
					activeOpacity={1}
					style={styles.left}
					onPress={this.props.onPressIconLeft}>
					<Image
						style={[styles.icon24, this.getStyleError().icon]}
						source={this.props.iconLeft}
					/>
				</TouchableOpacity>
			)
		}
		return null
	}

	iconDown = () => (
		<View style={styles.right}>
			<Image style={[styles.icon24, this.getStyleError().icon]} source={this.props.iconRight} />
		</View>
	)

	iconEye = () => (
		<TouchableOpacity
			style={styles.right}
			onPress={() => this.setState({ hidePassword: !this.state.hidePassword })}>
			<Image
				style={[styles.icon24, this.getStyleError().icon]}
				source={!this.state.hidePassword ? images.ic_eye : images.ic_eye_close}
			/>
		</TouchableOpacity>
	)

	requireInput = () => <Text style={{ color: colors.error }}> *</Text>

	render() {
		const { label } = this.props
		const { isFocused, labelHeight } = this.state
		const top: any = this._animatedIsFocused.interpolate({
			inputRange: [0, 1],
			outputRange: [sizes.s14, sizes.s5],
		})
		const fontSize: any = this._animatedIsFocused.interpolate({
			inputRange: [0, 1],
			outputRange: [BASE_SIZE, sizes.s12],
		})
		return (
			<>
				<TouchableOpacity
					activeOpacity={this.props.isPicker ? 0.8 : 1}
					disabled={this.props.disabled}
					onPress={() => {
						this.props.isPicker ? this.props?.onPress?.() : this.focus()
					}}
					style={[
						styles.container,
						this.props.style,
						isFocused && styles.focusStyle,
						this.props.disabled && { backgroundColor: colors.disable_text },
						this.state.error ? { backgroundColor: colors.error_background } : null,
					]}>
					{this.props.icon && (
						<Image
							style={{ ...Style.icon24, marginRight: sizes.s16 }}
							source={this.props.icon}
						/>
					)}
					{/* //////label floating///// */}
					<Animated.Text
						onLayout={(event) => {
							labelHeight === 0 &&
								this.setState({ labelHeight: event.nativeEvent.layout.height })
						}}
						style={[
							styles.labelStyle,
							{
								top,
								fontSize,
							},
							this.props.styleLabel,

							this.props.iconRight && { right: ICON_SIZE * 2 },
							this.props.iconLeft && { left: ICON_SIZE * 2 },
						]}>
						{label}
						{this.props.isRequired ? this.requireInput() : null}
					</Animated.Text>

					{this.props.isPicker ? (
						<>
							{this.iconLeft()}
							{this.text()}
							{this.iconDown()}
						</>
					) : this.props.isPassword ? (
						<>
							{this.iconLeft()}
							{this.textPassword()}
							{this.iconEye()}
						</>
					) : (
						<>
							{this.iconLeft()}
							{this.textInputs()}
							{this.iconRight()}
						</>
					)}
				</TouchableOpacity>
				{this.state.message ? (
					<Text style={styles.messageError}>{this.state.message}</Text>
				) : null}
			</>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		borderColor: colors.input_background,
		borderRadius: sizes.s16,
		borderWidth: sizes.s1,
		paddingHorizontal: sizes.s16,
		height: VIEW_HEIGHT,
		justifyContent: 'center',
		backgroundColor: colors.input_background,
		marginTop: sizes.s16,
	},
	labelStyle: {
		padding: 0,
		textAlignVertical: 'top',
		position: 'absolute',
		left: sizes.s16,
		fontFamily: fonts.regular,
		color: colors.secondary_text,
	},
	textInput: {
		position: 'absolute',
		left: sizes.s16,
		right: sizes.s16,
		bottom: 0,
		paddingBottom: sizes.s8,
		padding: 0,
		borderWidth: 0,
		...Style.txt16,
	},
	messageError: {
		marginHorizontal: BASE_SIZE * 1.5,
		marginTop: 3,
		marginBottom: -BASE_SIZE / 2,
		...Style.txt12,
		color: colors.error,
	},
	focusStyle: {
		borderColor: colors.primary,
		backgroundColor: colors.white,
	},
	icon24: { width: ICON_SIZE, height: ICON_SIZE },

	right: {
		position: 'absolute',
		right: BASE_SIZE,
	},
	left: {
		position: 'absolute',
		left: BASE_SIZE,
	},
})
