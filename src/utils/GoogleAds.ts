// import { TestIds } from 'react-native-google-mobile-ads';

import { TestIds } from 'react-native-google-mobile-ads';

// KEY DEV
// export const keyAdsOpenApp: string | any = TestIds.APP_OPEN;
// export const keyBanner_onboarding: string | any = TestIds.BANNER;
// export const keyNative_onboarding: string | any = 'ca-app-pub-3940256099942544/2247696110';
// export const keyBanner_home: string | any = TestIds.BANNER;
// export const keyBanner_category: string | any = TestIds.BANNER;
// export const keyInterstitialSplash: string | any = TestIds.INTERSTITIAL;
// export const keyInterstitialApplyHigh: string | any = TestIds.INTERSTITIAL;
// export const keyInterstitialApply: string | any = TestIds.INTERSTITIAL;
// export const keyInterstitialOpenImageHigh: string = TestIds.INTERSTITIAL;
// export const keyInterstitialOpenImage: string = TestIds.INTERSTITIAL;
// export const keyInterstitialOpenCateHigh: string = TestIds.INTERSTITIAL;
// export const keyInterstitialOpenCate: string = TestIds.INTERSTITIAL;
// export const keyOnAppResume: string | any = TestIds.APP_OPEN;

/// Key PRODUCTION
export const keyAdsOpenApp: string | any = __DEV__
	? TestIds.APP_OPEN
	: 'ca-app-pub-6548166688052880/4282287871';
export const keyBanner_onboarding: string | any = __DEV__
	? TestIds.BANNER
	: 'ca-app-pub-6548166688052880/8900189737';
export const keyNative_onboarding: string | any = 'ca-app-pub-6548166688052880/8131685939';
export const keyBanner_home: string | any = __DEV__
	? TestIds.BANNER
	: 'ca-app-pub-6548166688052880/8029961195';
export const keyBanner_category: string | any = __DEV__
	? TestIds.BANNER
	: 'ca-app-pub-6548166688052880/3647863050';
export const keyInterstitialSplash = __DEV__
	? TestIds.INTERSTITIAL
	: 'ca-app-pub-6548166688052880/9444767609';
export const keyInterstitialApplyHigh = __DEV__
	? TestIds.INTERSTITIAL
	: 'ca-app-pub-6548166688052880/5999280959';
export const keyInterstitialApply = __DEV__
	? TestIds.INTERSTITIAL
	: 'ca-app-pub-6548166688052880/1021699710';
export const keyInterstitialOpenImageHigh: string = __DEV__
	? TestIds.INTERSTITIAL
	: 'ca-app-pub-6548166688052880/1368359669';
export const keyInterstitialOpenImage: string = __DEV__
	? TestIds.INTERSTITIAL
	: 'ca-app-pub-6548166688052880/3994523008';
export const keyInterstitialOpenCateHigh: string = __DEV__
	? TestIds.INTERSTITIAL
	: 'ca-app-pub-6548166688052880/9598999633';
export const keyInterstitialOpenCate: string = __DEV__
	? TestIds.INTERSTITIAL
	: 'ca-app-pub-6548166688052880/5738849518';
export const keyOnAppResume = __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-6548166688052880/5721145011';

// LINK WEB
export const urlPolicy: string =
	'https://sites.google.com/view/wallpaper4k-policy/trang-ch%E1%BB%A7';
export const urlTermOfService: string =
	'https://sites.google.com/view/wallpaper4ksg/trang-ch%E1%BB%A7';
