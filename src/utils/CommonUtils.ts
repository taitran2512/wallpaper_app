import { throttle } from 'lodash';
import { Alert, LayoutAnimation } from 'react-native';

export const showAlert = (
	message = 'Something went wrong, please try again later.',
	callback?: any
) => {
	Alert.alert('Notice', message, [{ text: 'OK', onPress: callback }], {
		cancelable: true,
	});
};

export const avatarUri = (avatar?: string) => {
	if (!avatar) {
		return '';
	}
	if (avatar?.includes('https://') || avatar?.includes('file://')) {
		return { uri: avatar };
	}
	return { uri: URL + avatar };
};

export const imageSource = (image?: string) => {
	if (typeof image === 'number') {
		return image;
	}
	if (!image) {
		return { uri: '' };
	}
	if (image?.includes('https://') || image?.includes('http://') || image?.includes('file://')) {
		return { uri: image };
	}
	return { uri: URL + image };
};

export const layoutAnimation = throttle(() => {
	LayoutAnimation.configureNext(
		LayoutAnimation.create(
			250,
			LayoutAnimation.Types.easeInEaseOut,
			LayoutAnimation.Properties.opacity
		)
	);
}, 1500);
