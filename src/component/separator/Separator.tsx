import { colors } from 'core/index';
import React from 'react';
import { View } from 'react-native';

interface Props {
	backgroundColor?: string;
	height: number;
}

const Separator: React.FC<Props> = ({ height, backgroundColor = colors.separator }) => {
	return <View style={{ width: '100%', backgroundColor, height }} />;
};

export default Separator;

