import { images } from 'assets';
import { Navigator, sizes } from 'core';
import React from 'react';
import NavigationButton, { NavigationButtonProps } from './NavigationButton';

const NavigationBackButton = (props?: NavigationButtonProps) => {
	return (
		<NavigationButton
			icon={props?.icon || images.ic_arrow_left}
			onPress={() => Navigator.goBack()}
			containerStyle={{ marginLeft: -sizes.s8 }}
			{...props}
		/>
	);
};

export default NavigationBackButton;
