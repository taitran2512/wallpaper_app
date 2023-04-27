import { NativeModules } from 'react-native';
/**
 * type = home, lock, both
 */
interface WallpaperManagerType {
	setWallpaper(url: any, type: string, callback: (res: any) => void): Promise<any>;
}

const { WallpaperManageModule } = NativeModules || {};
export default WallpaperManageModule as WallpaperManagerType;
