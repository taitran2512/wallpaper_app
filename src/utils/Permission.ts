import { Alert, PermissionsAndroid } from 'react-native';
import {
	openSettings,
	PERMISSIONS,
	request,
	requestNotifications,
	RESULTS,
} from 'react-native-permissions';
import Device from './Device';

class Permissions {
	async camera(callback?: () => void) {
		if (Device.isIos) {
			request(PERMISSIONS.IOS.CAMERA).then((result) => {
				if (result === RESULTS.GRANTED) {
					callback && callback();
				} else {
					Alert.alert('Notice', 'Please accept application for camera to continue', [
						{ text: 'Cancel' },
						{
							text: 'OK',
							onPress: () => {
								openSettings();
							},
						},
					]);
				}
			});
		} else {
			try {
				const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					callback && callback();
				} else {
					Alert.alert('Notice', 'Please accept application for camera to continue', [
						{ text: 'Cancel' },
						{
							text: 'OK',
							onPress: () => {
								openSettings();
							},
						},
					]);
				}
			} catch (err) {}
		}
	}

	photoLibrary(callback?: () => void) {
		if (Device.isIos) {
			request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
				if (result === RESULTS.GRANTED) {
					callback && callback();
				} else {
					Alert.alert('Notice', 'Please accept application for photo library to continue', [
						{ text: 'Cancel' },
						{
							text: 'OK',
							onPress: () => {
								openSettings();
							},
						},
					]);
				}
			});
		} else {
			try {
				PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO).then(
					(result) => {
						if (result === PermissionsAndroid.RESULTS.GRANTED) {
							callback && callback();
						} else {
							Alert.alert(
								'Notice',
								'Please accept application for photo library to continue',
								[
									{ text: 'Cancel' },
									{
										text: 'OK',
										onPress: () => {
											openSettings();
										},
									},
								]
							);
						}
					}
				);
			} catch (err) {}
		}
	}

	async microphone(callback?: () => void) {
		if (Device.isIos) {
			request(PERMISSIONS.IOS.MICROPHONE).then((result) => {
				if (result === RESULTS.GRANTED) {
					callback && callback();
				} else {
					Alert.alert('Notice', 'Please accept application for microphone to continue', [
						{ text: 'Cancel' },
						{
							text: 'OK',
							onPress: () => {
								openSettings();
							},
						},
					]);
				}
			});
		} else {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
				);
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					callback && callback();
				}
			} catch (err) {}
		}
	}

	async notification() {
		try {
			const granted = await requestNotifications(['alert', 'sound']);
		} catch (err) {}
	}
}
export default new Permissions();
