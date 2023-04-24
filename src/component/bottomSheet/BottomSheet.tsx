import { colors, screenHeight, sizes } from 'core';
import { BottomSheetProps } from 'model';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import BottomSheetHeader from './BottomSheetHeader';

const BottomSheet: React.FC<BottomSheetProps> = forwardRef((props: BottomSheetProps, ref: any) => {
	const { style, screen, showHeader = true, onClose } = props || {};

	const [viewHeight, setViewHeight] = useState<number>(0);
	const translateY = useRef(new Animated.Value(viewHeight)).current;
	const time = 250;
	const isOpen = useRef(false);

	useImperativeHandle(ref, () => ({
		close: slideDown,
	}));

	useEffect(() => {
		if (viewHeight > 0 && !isOpen.current) {
			translateY.setValue(viewHeight);
			isOpen.current = true;
			slideUp();
		}
	}, [viewHeight]);

	const slideUp = (): void => {
		Animated.timing(translateY, {
			toValue: 0,
			duration: time,
			useNativeDriver: true,
		}).start();
	};

	const slideDown = (callBack: any): void => {
		Animated.timing(translateY, {
			toValue: viewHeight,
			duration: time,
			useNativeDriver: true,
		}).start(() => {
			setTimeout(() => {
				callBack?.();
			}, time / 2);
		});
	};
	const ScreenComponent = screen;

	const renderHeader = () => {
		if (showHeader) {
			return <BottomSheetHeader {...props} />;
		}
	};

	return (
		<Animated.View
			onLayout={(e) => {
				setViewHeight(e.nativeEvent.layout.height);
			}}
			style={[styles.bottomSheet, { transform: [{ translateY }] }, style]}>
			{renderHeader()}
			<ScreenComponent {...props} requestClose={onClose} />
		</Animated.View>
	);
});

export default BottomSheet;

const styles = StyleSheet.create({
	bottomSheet: {
		backgroundColor: colors.white,
		borderTopLeftRadius: sizes.s12,
		borderTopRightRadius: sizes.s12,
		width: '100%',
		maxHeight: screenHeight * 0.9,
	},
});
