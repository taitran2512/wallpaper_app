import { NativeModules } from 'react-native';
const { WallpaperManageModule } = NativeModules || {};
/**
 * type = home, lock, both
 */
interface WallpaperManagerType {
	setWallpaper(url: any, type: string, callback?: (res: any) => void): Promise<any>;
}

export default WallpaperManageModule as WallpaperManagerType;
