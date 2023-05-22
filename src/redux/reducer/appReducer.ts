import { AnyAction } from '@reduxjs/toolkit';
import { INCREMENT_CATEGORY, INCREMENT_IMAGE_HOME, SET_CONFIG_FIREBASE } from 'action/appAction';

export interface AppState {
	countShowAds: number;
	countShowAdsHome: number;
	config: any;
}

const initialState: AppState = {
	countShowAds: 0,
	countShowAdsHome: 0,
	config: null,
};

export const appReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case INCREMENT_CATEGORY:
			return {
				...state,
				countShowAds: state.countShowAds + 1,
			};
		case INCREMENT_IMAGE_HOME:
			return {
				...state,
				countShowAdsHome: state.countShowAdsHome + 1,
			};
		case SET_CONFIG_FIREBASE:
			return {
				...state,
				config: action.payload,
			};
		default:
			return state;
	}
};
