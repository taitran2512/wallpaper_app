import { dataDetailCategory } from 'common/data';
import { GridImageView } from 'component';
import React from 'react';

const New = ({ navigation }: any) => {
	return <GridImageView data={dataDetailCategory} navigation={navigation} />;
};

export default New;
