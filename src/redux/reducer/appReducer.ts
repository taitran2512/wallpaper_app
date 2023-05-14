import { AnyAction } from '@reduxjs/toolkit';
import { INCREMENT_CATEGORY, INCREMENT_IMAGE_HOME } from 'action/appAction';

export interface AppState {
	countShowAds: number;
	countShowAdsHome: number;
}

const initialState: AppState = {
	countShowAds: 0,
	countShowAdsHome: 0,
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
		default:
			return state;
	}
};
