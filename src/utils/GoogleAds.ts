import { Platform } from 'react-native';

export const keyBanner: string | any = Platform.select({
	ios: 'ca-app-pub-6940318651748857/7904977347',
	android: 'ca-app-pub-6940318651748857/8858680952',
});
