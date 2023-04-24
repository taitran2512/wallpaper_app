import { BottomSheet, BottomSheetSwipe } from 'component';
import { colors, Navigator, screenWidth, sizes, Style } from 'core';
import { throttle } from 'lodash';
import { ModalsParams } from 'model';
import React, { Component } from 'react';
import {
	Animated,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

export default class Modals extends Component<any> {
	bottomSheetRef: any;
	params: ModalsParams;
	scale: any;
	constructor(props: any) {
		super(props);
		Navigator.setModalsNavigation(props.navigation);
		this.bottomSheetRef = React.createRef<any>();
		this.params = this.props.route?.params || {};
		this.scale = new Animated.Value(0);
	}

	componentDidMount(): void {
		if (this.params.type === 'alert') {
			this.animationAlert(1);
		}
	}

	animationAlert(value: number, callBack?: () => void) {
		Animated.timing(this.scale, {
			useNativeDriver: true,
			toValue: value,
			duration: 200,
		}).start(callBack);
	}

	clodeModals = throttle((callback?: () => void) => {
		if (this.bottomSheetRef.current) {
			this.bottomSheetRef.current?.close(() => Navigator.hideModal(callback));
		} else {
			this.animationAlert(0, () => Navigator.hideModal(callback));
		}
	}, 1000);

	renderComponent = () => {
		const {
			type,
			title = 'Notice',
			content = '',
			buttonSubmit = 'OK',
			buttonCancel = 'Cancel',
			onSubmit = () => {},
			onCancel = () => {},
			screen,
			height = 0,
		} = this.params;
		switch (type) {
			case 'alert':
				return (
					<Animated.View
						style={{
							backgroundColor: 'white',
							width: screenWidth * 0.8,
							...Style.radius16,
							transform: [{ scale: this.scale }],
						}}>
						<View style={[styles.item_alert, Style.borderBottom]}>
							<Text style={[Style.txt14, Style.semibold]}>{title}</Text>
						</View>
						<TouchableOpacity
							activeOpacity={0.7}
							style={[styles.item_alert, Style.borderBottom]}
							onPress={() => {
								this.clodeModals(onCancel);
							}}>
							<Text style={[styles.text_button_alert, { color: colors.red }]}>
								{buttonCancel}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.7}
							style={styles.item_alert}
							onPress={() => {
								this.clodeModals(onSubmit);
							}}>
							<Text style={[styles.text_button_alert, { color: colors.blue }]}>
								{buttonSubmit}
							</Text>
						</TouchableOpacity>
					</Animated.View>
				);

			case 'bottom':
				return (
					<BottomSheet
						ref={this.bottomSheetRef}
						screen={screen}
						onClose={this.clodeModals}
						{...this.params}
					/>
				);

			case 'bottom-swipe':
				return (
					<BottomSheetSwipe
						ref={this.bottomSheetRef}
						height={height}
						onClose={(callback) => Navigator.hideModal(callback)}
						screen={screen}
						{...this.params}
					/>
				);
			default:
				return;
		}
	};

	render() {
		const { type = 'alert' } = this.params || {};

		return (
			<KeyboardAvoidingView style={[styles.container]} behavior="padding">
				<TouchableWithoutFeedback
					onPress={() => {
						const { closeOnTouchOutSide = true } = this.params;
						if (!closeOnTouchOutSide) {
							return;
						}
						this.clodeModals();
					}}>
					<View style={[{ flex: 1 }, type === 'alert' ? styles.alert : styles.bottom]}>
						<TouchableWithoutFeedback>
							<View>{this.renderComponent()}</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(10, 9, 25, 0.7)',
	},
	alert: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	bottom: {
		justifyContent: 'flex-end',
	},
	item_alert: {
		padding: sizes.s16,
		alignItems: 'center',
	},
	text_button_alert: {
		...Style.txt16,
		...Style.semibold,
	},
	border_bottom: {},
});
