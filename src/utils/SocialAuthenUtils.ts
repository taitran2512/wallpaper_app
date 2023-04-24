import appleAuth from '@invertase/react-native-apple-authentication';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { isEmpty } from 'lodash';
import { AccessToken, LoginManager, Profile } from 'react-native-fbsdk-next';
import Device from './Device';

GoogleSignin.configure({
	webClientId: Device.isIos
		? '828847573751-his43gi0n3m5bvasjchj5mu3p95k1971.apps.googleusercontent.com'
		: '828847573751-his43gi0n3m5bvasjchj5mu3p95k1971.apps.googleusercontent.com',
	offlineAccess: false,
});

export const loginGoogle = async () => {
	try {
		const [isSignedIn, currentUser] = await Promise.all([
			GoogleSignin.isSignedIn(),
			GoogleSignin.getCurrentUser(),
		]);

		if (isSignedIn && !isEmpty(currentUser)) {
			return currentUser;
		}

		await GoogleSignin.signOut();
		await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

		const userInfo: User = await GoogleSignin.signIn();

		if (!userInfo) {
			throw 'System error!';
		}
		return userInfo;
	} catch (error: any) {}
};

export const loginFacebook = async () => {
	try {
		const result = await LoginManager.logInWithPermissions(['email', 'public_profile']);
		if (result.isCancelled) {
			throw 'System error!';
		} else {
			// Once signed in, get the users AccesToken
			const data = await AccessToken.getCurrentAccessToken();
			const currentProfile: any = await Profile.getCurrentProfile();
			const userFB = Object.assign({}, data, currentProfile);
			if (userFB.email === '' || userFB?.name === '') {
				throw 'System error!';
			} else {
				return userFB;
			}
		}
	} catch (error: any) {
		throw 'User cancelled the login process';
	}
};

export const loginApple = async () => {
	try {
		const userApple = await appleAuth.performRequest({
			requestedOperation: appleAuth.Operation.LOGIN,
			requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
		});
		if (!userApple) {
			throw 'System error!';
		}
		return userApple;
	} catch (error: any) {
		throw 'User cancelled the login process';
	}
};
