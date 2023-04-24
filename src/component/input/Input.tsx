import { images } from 'assets';
import Icon from 'component/image/Icon';
import { colors, sizes, Style, Navigator } from 'core';
import { InputProps, InputState } from 'model';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

export default class Input extends Component<InputProps, InputState> {
	inputRef: React.MutableRefObject<TextInput>;
	constructor(props: InputProps) {
		super(props);
		this.state = {
			isFocused: false,
			isHidePassword: this.props.isPassword,
		};
		this.inputRef = React.createRef<any>();
	}

	renderLabel = () => {
		if (this.props.label) {
			return <Text style={[Style.txt12, Style.bottom4]}>{this.props.label}</Text>;
		}
	};

	renderIcon = (icon: any, onPress: any, style: any) => {
		if (icon) {
			return (
				<Icon style={style} source={icon} onPress={onPress} tintColor={colors.placeholder} />
			);
		}
	};

	renderInput = () => {
		const { isPicker, isDatePicker, inputStyle, placeholder, value, ...inputProps } =
			this.props || {};
		const { isHidePassword } = this.state;

		if (isPicker || isDatePicker) {
			return (
				<Text
					numberOfLines={1}
					style={[
						styles.input,
						{ color: value ? colors.black : colors.placeholder },
						inputStyle,
					]}>
					{value || placeholder}
				</Text>
			);
		}

		return (
			<TextInput
				ref={this.inputRef}
				{...inputProps}
				value={value}
				style={[styles.input, inputStyle]}
				placeholder={placeholder}
				placeholderTextColor={colors.placeholder}
				onFocus={() => this.setState({ isFocused: true })}
				onBlur={() => this.setState({ isFocused: false })}
				secureTextEntry={isHidePassword}
			/>
		);
	};

	onPressInput = () => {
		this.inputRef.current.focus();
	};

	render() {
		const {
			style,
			iconRight,
			iconLeft,
			onPressIconRight,
			onPressIconLeft,
			isPassword,
			isPicker,
			onPress,
			inputContainerStyle,
		} = this.props || {};
		const { isHidePassword } = this.state;
		const borderColor = this.state.isFocused ? colors.blue : colors.borderInput;

		return (
			<TouchableOpacity
				activeOpacity={1}
				style={[styles.container, style]}
				onPress={isPicker ? onPress : this.onPressInput}>
				{this.renderLabel()}
				<View style={[styles.inputContainer, { borderColor }, inputContainerStyle]}>
					{this.renderIcon(iconLeft, onPressIconLeft, styles.iconLeft)}
					{this.renderInput()}
					{isPassword
						? this.renderIcon(
								this.state.isHidePassword ? images.ic_eye : images.ic_eye_slash,
								() => this.setState({ isHidePassword: !isHidePassword }),
								styles.iconRight
						  )
						: isPicker
						? this.renderIcon(iconRight || images.ic_down, onPress, styles.iconRight)
						: this.renderIcon(iconRight, onPressIconRight, styles.iconRight)}
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: sizes.s16,
	},
	inputContainer: {
		paddingVertical: sizes.s10,
		paddingHorizontal: sizes.s16,
		...Style.border,
		borderRadius: sizes.s8,
		...Style.row,
	},
	input: {
		flex: 1,
		...Style.txt14,
		padding: 0,
	},
	iconRight: {
		marginLeft: sizes.s4,
	},
	iconLeft: {
		marginRight: sizes.s4,
	},
});
