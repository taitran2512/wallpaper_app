import { Image, NativeModules, Platform } from 'react-native';
const { WallpaperManageModule } = NativeModules || {};
/**
 * type = home, lock, both
 */

const ManageWallpaper = {
	setWallpaper: (source: any, type: any, callback = (res: any) => {}) => {
		if (Platform.Version >= 24 && !type) {
			throw new Error(
				'Type is undefined\nimport {TYPE} from "react-native-manage-wallpaper\nUse TYPE.HOME"'
			);
		}

		if (!type) {
			type = 'home';
		}

		if (typeof type !== 'string') {
			throw new Error(
				'Invalid type datatype\nimport {TYPE} from "react-native-manage-wallpaper\nUse TYPE.HOME"'
			);
		}

		WallpaperManageModule.setWallpaper(Image.resolveAssetSource(source), type, callback);
	},
};

export default ManageWallpaper;

export { ManageWallpaper };
