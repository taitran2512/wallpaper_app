/**
 * @format
 */
import remoteConfig from '@react-native-firebase/remote-config';
import { AppRegistry, LogBox, Text } from 'react-native';
import { AdManager } from 'react-native-admob-native-ads';
import { name as appName } from './app.json';
import App from './src/App';
import { Screens, objScreen } from './src/common';
// get screen name from import
for (let key in objScreen) {
	Screens[key] = key;
}

AdManager.setRequestConfiguration({
	tagForChildDirectedTreatment: false,
});
remoteConfig();
// image test ad
AdManager.registerRepository({
	name: 'imageAd',
	adUnitId: 'ca-app-pub-6548166688052880/8131685939',
	numOfAds: 3,
	nonPersonalizedAdsOnly: false,
	videoOptions: {
		mute: false,
	},
	expirationPeriod: 3600000, // in milliseconds (optional)
	mediationEnabled: false,
}).then((result) => {
	console.log('registered: ', result);
});

// disale console log on build
if (!__DEV__) {
	console.log = () => {};
	console.info = () => {};
	console.error = () => {};
}
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state', 'Require']);

AppRegistry.registerComponent(appName, () => App);
