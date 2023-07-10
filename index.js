/**
 * @format
 */
import remoteConfig from '@react-native-firebase/remote-config';
import { AppRegistry, LogBox, Text } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import { objScreen, Screens } from './src/common';
// get screen name from import
for (let key in objScreen) {
	Screens[key] = key;
}

remoteConfig();
// image test ad

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
