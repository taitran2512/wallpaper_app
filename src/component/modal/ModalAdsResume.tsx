/* eslint-disable @typescript-eslint/no-unused-vars */
import { colors, Style } from 'core/index';
import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

interface Props {
	ref?: any;
}
const ModalAdsResume: React.FC<Props> = forwardRef((props: Props, ref: any) => {
	const [showModel, setShowModel] = useState<boolean>(false);

	const open = () => {
		setShowModel(true);
	};
	const close = (callBack = () => {}): void => {
		setShowModel(false);
	};

	useImperativeHandle(ref, () => ({
		open: () => open(),
		close: (callBack: () => void) => close(callBack),
	}));
	useEffect(() => {
		const timeout = setTimeout(() => {
			close();
		}, 5000);
		return () => {
			clearTimeout(timeout);
		};
	}, []);
	return (
		<Modal visible={showModel} animationType="fade" statusBarTranslucent transparent>
			<View style={styles.container}>
				<View
					style={[Style.flex, Style.column_center, { backgroundColor: colors.backgroundApp }]}>
					<ActivityIndicator color={colors.blue} size="large" />
				</View>
			</View>
		</Modal>
	);
});
export default memo(ModalAdsResume);
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.backgroundApp,
	},
});
