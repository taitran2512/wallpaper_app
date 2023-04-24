import { colors, sizes, Style } from 'core';
import { throttle } from 'lodash';
import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
	TextStyle,
} from 'react-native';
import Image, { ImageStyle } from 'react-native-fast-image';

export interface NavigationButtonProps {
	title?: string;
	titleStyle?: StyleProp<TextStyle>;
	icon?: any;
	iconStyle?: StyleProp<ImageStyle>;
	tintColor?: string;
	color?: string;
	badge?: any;
	badgeStyle?: StyleProp<ViewStyle>;
	titleBadgeStyle?: StyleProp<TextStyle>;
	containerStyle?: StyleProp<ViewStyle>;
	style?: StyleProp<ViewStyle>;
	onPress?: () => void;
	disabled?: boolean;
}

export default class NavigationButton extends React.Component<NavigationButtonProps, any> {
	renderItem = () => {
		const { title, titleStyle, icon, iconStyle, tintColor, color = colors.black } = this.props;
		if (title) {
			return (
				<Text style={[Style.txt14, { color: color || tintColor }, titleStyle]}>{title}</Text>
			);
		}
		if (icon) {
			return <Image source={icon} style={[styles.icon, iconStyle]} tintColor={tintColor} />;
		}
		return null;
	};

	onPressButton = (action?: () => void) =>
		throttle(
			() => {
				action && action();
			},
			1000,
			{ leading: true, trailing: false }
		);

	_getBadge = (badge: any) => {
		if (typeof badge === 'number') {
			return badge >= 100 ? '99+' : badge;
		} else {
			return ' ';
		}
	};

	renderBadge() {
		const { badge, badgeStyle, titleBadgeStyle } = this.props;
		if (!badge) {
			return null;
		}
		return (
			<View pointerEvents="none" style={[styles.viewBadge, badgeStyle]}>
				<Text numberOfLines={1} style={[styles.txtBadge, titleBadgeStyle]}>
					{this._getBadge(badge)}
				</Text>
			</View>
		);
	}

	renderContent() {
		const { containerStyle, style, onPress, disabled, title } = this.props;
		return (
			<View style={containerStyle}>
				<TouchableOpacity
					activeOpacity={0.85}
					style={[styles.container, style]}
					disabled={disabled}
					onPress={this.onPressButton(onPress)}>
					{this.renderItem()}
				</TouchableOpacity>
				{this.renderBadge()}
			</View>
		);
	}

	render() {
		return <>{this.renderContent()}</>;
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		paddingHorizontal: sizes.s16,
	},
	txtBadge: {
		color: colors.white,
		fontSize: sizes.s8,
	},
	viewBadge: {
		borderRadius: 10,
		backgroundColor: colors.red,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: sizes.s10,
		right: sizes.s20,
		paddingHorizontal: 3,
		height: sizes.s10,
		width: sizes.s10,
	},
	icon: {
		width: sizes.s24,
		height: sizes.s24,
	},
	title: {
		fontSize: sizes.s14,
	},
});
