import { colors, sizes, Style } from 'core/index';
import React, { memo } from 'react';
import { LayoutAnimation, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
	active: boolean;
	onChange: () => void;
}

const width = sizes.s44;
const height = sizes.s24;
const circle = sizes.s20;
const padding = sizes.s2;

const Switch: React.FC<Props> = (props: Props) => {
	const onSwitch = () => {
		LayoutAnimation.configureNext(
			LayoutAnimation.create(
				250,
				LayoutAnimation.Types.easeInEaseOut,
				LayoutAnimation.Properties.opacity
			)
		);
		props.onChange();
	};
	return (
		<TouchableOpacity
			activeOpacity={1}
			onPress={onSwitch}
			style={[
				styles.container,
				{ backgroundColor: props.active ? colors.blue : colors.background },
			]}>
			<View
				style={[
					styles.cirle,
					{ marginLeft: props.active ? width - circle - padding : padding },
				]}
			/>
		</TouchableOpacity>
	);
};

export default memo(Switch);

Switch.defaultProps = {
	onChange: () => {},
};
const styles = StyleSheet.create({
	container: {
		width,
		height,
		borderRadius: height,
		justifyContent: 'center',
	},
	cirle: {
		width: circle,
		height: circle,
		borderRadius: circle,
		backgroundColor: colors.white,
		...Style.shadow3,
	},
});
