/* eslint-disable @typescript-eslint/no-unused-vars */
import { BlurView } from '@react-native-community/blur';
import { colors, sizes, Style } from 'core/index';
import React, { forwardRef, memo, useImperativeHandle, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

interface Props {
	ref?: any;
	onPress?: () => void;
	content: string;
	title: string;
	children?: any;
}
const ModalConfirm: React.FC<Props> = forwardRef((props: Props, ref: any) => {
	const [show, setShow] = useState<boolean>(false);
	const open = () => {
		setShow(true);
	};
	const close = (callBack = () => {}): void => {
		setShow(false);
	};

	useImperativeHandle(ref, () => ({
		open: () => open(),
		close: (callBack: () => void) => close(callBack),
	}));

	return (
		<Modal
			visible={show}
			animationType="fade"
			statusBarTranslucent
			transparent
			onRequestClose={() => close()}>
			<View style={styles.container}>
				<View style={styles.modal}>
					<BlurView
						style={[StyleSheet.absoluteFill]}
						blurType="light"
						blurAmount={10}
						blurRadius={25}
						overlayColor="transparent"
						reducedTransparencyFallbackColor="white"
					/>
					<Text style={styles.title}>{props?.title}</Text>
					{props?.content ? <Text style={styles.subTitle}>{props?.content}</Text> : null}
					{props?.children}
				</View>
			</View>
		</Modal>
	);
});
export default memo(ModalConfirm);
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		paddingHorizontal: sizes.s24,
	},
	modal: {
		backgroundColor: colors.gradient1,
		borderRadius: sizes.s16,
		paddingVertical: sizes.s16,
		paddingHorizontal: sizes.s16,
		overflow: 'hidden',
	},
	title: {
		...Style.txt14_white,
		textAlign: 'center',
	},
	subTitle: {
		...Style.txt16_secondary,
		marginBottom: sizes.s24,
		marginTop: sizes.s16,
		textAlign: 'center',
	},
});
