import { images } from 'assets';
import { Navigator } from 'core';
import React from 'react';
import NavigationButton, { NavigationButtonProps } from './NavigationButton';

const NavigationBackButton = (props?: NavigationButtonProps) => {
	return (
		<NavigationButton
			icon={props?.icon || images.ic_back}
			onPress={() => Navigator.goBack()}
			{...props}
		/>
	);
};

export default NavigationBackButton;
