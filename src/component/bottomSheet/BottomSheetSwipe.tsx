import Buttons from 'component/button/Buttons';
import { colors, sizes, Style } from 'core';
import { BottomSheetSwipeProps } from 'model';
import React, { Component } from 'react';
import { Animated, PanResponder, StyleSheet, View } from 'react-native';

interface States {
	modalVisible: boolean;
	animatedHeight: any;
	pan: any;
}
const time = 300;

class BottomSheetSwipe extends Component<BottomSheetSwipeProps, States> {
	panResponder: any;

	constructor(props: BottomSheetSwipeProps) {
		super(props);
		this.state = {
			modalVisible: false,
			animatedHeight: new Animated.Value(0),
			pan: new Animated.ValueXY(),
		};

		this.createPanResponder(props);
	}

	setModalVisible(visible: boolean, closeFunction: any = undefined) {
		const { height = 0, onClose = () => {} } = this.props;
		const { animatedHeight, pan } = this.state;
		if (visible) {
			Animated.timing(animatedHeight, {
				toValue: height,
				duration: time,
				useNativeDriver: false,
			}).start();
		} else {
			Animated.timing(animatedHeight, {
				toValue: 0,
				duration: time,
				useNativeDriver: false,
			}).start(() => {
				if (typeof closeFunction === 'function') {
					closeFunction();
					return;
				}
				onClose();
			});
		}
	}

	createPanResponder(props: BottomSheetSwipeProps) {
		const { height = 0 } = props;
		const { pan } = this.state;
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (e, gestureState) => {
				if (gestureState.dy > 0) {
					Animated.event([null, { dy: pan.y }], {
						useNativeDriver: false,
					})(e, gestureState);
				}
			},
			onPanResponderRelease: (e, gestureState) => {
				const gestureLimitArea = height / 3;
				const gestureDistance = gestureState.dy;
				if (gestureDistance > gestureLimitArea) {
					this.setModalVisible(false);
				} else {
					Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
				}
			},
		});
	}

	open() {
		this.setModalVisible(true);
	}

	close(func: any = undefined) {
		this.setModalVisible(false, func);
	}

	componentDidMount() {
		this.open();
	}

	render() {
		const {
			screen,
			draggable = true,
			isShowButton = false,
			buttonTitle,
			buttonOnPress,
			onClose = () => {},
		} = this.props;
		const { animatedHeight, pan } = this.state;
		const panStyle = {
			transform: pan.getTranslateTransform(),
		};
		const ScreenComponent = screen;

		return (
			<Animated.View
				{...(draggable && this.panResponder.panHandlers)}
				style={[
					panStyle,
					styles.container,
					{
						height: animatedHeight,
					},
				]}>
				<View style={styles.draggableIcon} />
				<View style={Style.flex}>
					<ScreenComponent
						{...this.props}
						requestClose={(callback?: () => void) => this.close(() => onClose(callback))}
					/>
				</View>
				{isShowButton && (
					<Buttons
						isSafe
						style={Style.mh24}
						title={buttonTitle}
						onPress={() => this.close(buttonOnPress)}
					/>
				)}
			</Animated.View>
		);
	}
}

export default BottomSheetSwipe;
const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 0,
		borderTopRightRadius: sizes.s16,
		borderTopLeftRadius: sizes.s16,
		backgroundColor: colors.white,
		overflow: 'hidden',
	},
	draggableIcon: {
		width: sizes.s32,
		height: sizes.s8,
		borderRadius: sizes.s8,
		backgroundColor: colors.divider,
		alignSelf: 'center',
		marginTop: sizes.s16,
	},
});
