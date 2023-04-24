import { images } from 'assets';
import Icon from 'component/image/Icon';
import { sizes, Style } from 'core';
import React, { memo, useEffect, useState } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface Props {
	style?: StyleProp<ViewStyle>;
	isActive?: boolean;
	title: string;
	onChange?: (value: boolean) => void;
}

const ItemCheckbox: React.FC<Props> = ({ style, isActive = false, title, onChange }) => {
	const [active, setActive] = useState<boolean>(isActive);
	useEffect(() => {
		setActive(isActive);
	}, [isActive]);

	const onPress = () => {
		setActive(!active);
		onChange?.(!active);
	};

	return (
		<TouchableOpacity activeOpacity={0.8} style={[styles.item_checkbox, style]} onPress={onPress}>
			<Icon
				size={sizes.s20}
				source={active ? images.ic_checkbox_checked : images.ic_checkbox}
				disabled
			/>
			<Text style={[Style.txt14, Style.left12]}>{title}</Text>
		</TouchableOpacity>
	);
};

export default memo(ItemCheckbox);

const styles = StyleSheet.create({
	item_checkbox: {
		...Style.row,
	},
});
