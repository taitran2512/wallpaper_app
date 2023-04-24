import { colors, sizes, Style } from 'core';
import { throttle } from 'lodash';
import React, { memo, useMemo } from 'react';
import {
	ImageRequireSource,
	Keyboard,
	StyleProp,
	StyleSheet,
	Text,
	TouchableOpacity,
	ViewStyle,
} from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';
import { Device } from 'utils';

interface Props {
	style?: StyleProp<ViewStyle>;
	size?: 'large' | 'medium' | 'small';
	type?: 'primary' | 'secondary' | 'outline';
	title?: string;
	icon?: Source | ImageRequireSource;
	disabled?: boolean;
	onPress?: () => void;
	isSafe?: boolean;
}
const buttonHeight = {
	large: sizes.s40,
	medium: sizes.s30,
	small: sizes.s20,
};

const buttonRadius = sizes.s8;

const Buttons: React.FC<Props> = ({
	style,
	size = 'large',
	type = 'primary',
	title,
	icon,
	disabled = false,
	onPress,
	isSafe = false,
}) => {
	const getStyle = useMemo(() => {
		const buttonStyle = {
			backgroundColor: type === 'primary' ? colors.blue : colors.white,
			borderColor: colors.blue,
		};
		const color =
			type === 'primary' ? colors.white : type === 'secondary' ? colors.text : colors.blue;
		switch (size) {
			case 'medium':
				return {
					button: {
						height: buttonHeight.medium,
						...Style.border,
						...buttonStyle,
					},
					icon: {
						...Style.icon20,
						...Style.right8,
						tintColor: color,
					},
					text: {
						...Style.txt16,
						color: color,
					},
				};
			case 'small':
				return {
					button: {
						height: buttonHeight.small,
						...Style.ph16,
						...Style.border,
						...buttonStyle,
					},
					icon: {
						...Style.icon16,
						marginRight: sizes.s6,
						tintColor: color,
					},
					text: {
						...Style.txt14,
						color: color,
					},
				};
			default:
				return {
					button: {
						height: buttonHeight.large,
						...Style.ph24,
						...Style.border,
						...buttonStyle,
					},
					icon: {
						...Style.icon16,
						...Style.right4,
						tintColor: color,
					},
					text: {
						...Style.txt14,
						color: color,
					},
				};
		}
	}, [size, type]);

	const getDisableStyle = () => {
		if (disabled) {
			return {
				button: type === 'primary' ? styles.btn_primary_disable : styles.btn_disabled,
				icon: styles.icon_disabled,
				text: styles.text_disabled,
			};
		}
	};

	const renderIcon = () => {
		if (icon) {
			return (
				<FastImage
					style={[getStyle.icon]}
					source={icon}
					tintColor={getDisableStyle()?.icon?.tintColor || getStyle.icon.tintColor}
				/>
			);
		}
	};

	const onPressButton = throttle(() => {
		Keyboard.dismiss();
		onPress?.();
	}, 500);
	return (
		<TouchableOpacity
			style={[
				Style.row_center,
				getStyle.button,
				style,
				isSafe && styles.submitButton,
				getDisableStyle()?.button,
				{
					borderRadius: buttonRadius,
				},
			]}
			activeOpacity={0.8}
			disabled={disabled}
			onPress={onPressButton}>
			{renderIcon()}
			{!!title && (
				<Text style={[getStyle.text, Style.semibold, getDisableStyle()?.text, styles.text]}>
					{title}
				</Text>
			)}
		</TouchableOpacity>
	);
};

export default memo(Buttons);

const styles = StyleSheet.create({
	text: { textAlignVertical: 'center', padding: 0, marginTop: -sizes.s3 / 2 },
	btn_disabled: { borderColor: colors.border },
	btn_primary_disable: { backgroundColor: colors.background, borderColor: colors.background },
	icon_disabled: { tintColor: colors.disable_text },
	text_disabled: { color: colors.disable_text },
	submitButton: {
		marginBottom: sizes.s16 + Device.getBottomSpace(),
	},
});
