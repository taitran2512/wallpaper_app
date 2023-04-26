/* eslint-disable @typescript-eslint/no-unused-vars */
import { Style, colors, sizes } from 'core/index';
import React, { forwardRef, memo, useImperativeHandle, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

interface Props {
	ref?: any;
	onPress?: () => void;
	content: string;
	title: string;
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
					<Text style={styles.title}>{props?.title}</Text>
					<Text style={styles.subTitle}>{props?.content}</Text>
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
		backgroundColor: 'rgba(0, 0, 0, 0.9)',
		paddingHorizontal: sizes.s24,
	},
	modal: {
		backgroundColor: colors.white,
		borderRadius: sizes.s16,
		paddingVertical: sizes.s16,
		paddingHorizontal: sizes.s16,
	},
	title: {
		fontSize: sizes.s24,
		textAlign: 'center',
		color: colors.black,
	},
	subTitle: {
		...Style.txt16_secondary,
		marginBottom: sizes.s24,
		marginTop: sizes.s16,
		textAlign: 'center',
	},
});
