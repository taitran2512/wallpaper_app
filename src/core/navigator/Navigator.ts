import { NavigationContainerRef, StackActions, TabActions } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { Stacks } from 'common';
import { headerDefaultOptions } from 'common/nagivationOption';
import { NavigationBackButton } from 'component';
import {
	AlertParams,
	BottomSheetProps,
	BottomSheetSwipeProps,
	DialogProps,
	ModalsParams,
	ScreenParams,
} from 'model';
import { Keyboard } from 'react-native';
import { colors } from '../style/colors';

export default class Navigator {
	static navigationRef: NavigationContainerRef<ReactNavigation.RootParamList> | any;
	static loadingRef: any;
	static toastDebugRef: any;
	static modalsNavigation: any;
	static modalOpened: number = 0;
	static animationDurationTime = 250;
	static defaultOptions: StackNavigationOptions = {
		headerTitleAlign: 'center',
		headerTintColor: colors.black,
		headerLeft: () => NavigationBackButton(),
		headerMode: 'float',
		title: '',
		...headerDefaultOptions,
	};

	static setNavigationRef(ref: any) {
		this.navigationRef = ref;
	}

	static setLoadingRef(ref: any) {
		this.loadingRef = ref;
	}

	static setToastDebugRef(ref: any) {
		this.toastDebugRef = ref;
	}

	static setModalsNavigation(ref: any) {
		if (!this.modalsNavigation) {
			this.modalsNavigation = ref;
		}
	}

	// toast debug function
	static showToastDebug(message?: string) {
		if (__DEV__) {
			this.toastDebugRef.show(message);
		}
	}

	// modals function
	static showAlert(params?: AlertParams) {
		this.showModal({
			type: 'alert',
			...params,
		});
	}

	static showBottom<T>(params?: BottomSheetProps & T) {
		this.showModal({
			type: 'bottom',
			...params,
		});
	}

	static showBottomSwipe<T>(params?: BottomSheetSwipeProps & T) {
		this.showModal({
			type: 'bottom-swipe',
			...params,
		});
	}

	static showModal(params?: ModalsParams) {
		Keyboard.dismiss();
		if (this.modalOpened === 0) {
			this.push(Stacks.Modals, params);
		} else {
			this.modalsNavigation.push(Stacks.Modals, params);
		}
		this.modalOpened += 1;
	}

	static hideModal(callback?: () => void) {
		this.modalOpened -= 1;
		this.goBack();
		if (callback) {
			setTimeout(callback, this.animationDurationTime * 1.5);
		}
	}

	static hideAllModal() {
		this.pop(this.modalOpened);
		this.modalOpened = 0;
	}

	static showDialog(params?: DialogProps) {
		this.navigate(Stacks.Dialog, params as any);
	}

	// Loading function
	static showLoading(message?: string) {
		this.loadingRef?.show(message);
	}

	static hideLoading() {
		this.loadingRef?.hide();
	}

	// Navigation function
	static navigate(name: any, params?: ScreenParams) {
		this.navigationRef.navigate(name, params);
		this.showToastDebug(name);
	}

	static jumpTo(name: any, params?: ScreenParams) {
		const jumpToAction = TabActions.jumpTo(name, params);
		this.navigationRef?.dispatch(jumpToAction);
		this.showToastDebug(name);
	}

	static goBack() {
		this.navigationRef.canGoBack() && this.navigationRef?.goBack();
	}

	static replace(name: any, params?: ScreenParams) {
		this.navigationRef?.dispatch(StackActions.replace(name, params));
		this.showToastDebug(name);
	}

	static reset(name: any, params?: ScreenParams) {
		this.navigationRef?.reset({
			routes: [{ name: name, params }],
		});
		this.showToastDebug(name);
	}

	static pop(number: number) {
		this.navigationRef.dispatch(StackActions.pop(number));
	}

	static popToTop() {
		this.navigationRef.dispatch(StackActions.popToTop());
	}

	static push(name: any, params?: ScreenParams) {
		this.navigationRef.dispatch(StackActions.push(name, params));
		this.showToastDebug(name);
	}

	static goHome() {
		this.reset(Stacks.HomeStack);
	}

	static goLogin() {
		// this.reset(Stacks.AuthenStack);
	}
}
