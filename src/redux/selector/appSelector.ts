import { RootState } from 'model';

export const countCategory = (state: RootState) => state.app.countShowAds || 0;
export const countImageHomeSelector = (state: RootState) => state.app.countShowAdsHome || 0;
