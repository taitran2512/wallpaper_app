import { createAction } from '@reduxjs/toolkit';

export const INCREMENT_CATEGORY = 'INCREMENT_CATEGORY';
export const incrementCategoryAction = createAction(INCREMENT_CATEGORY);
export const INCREMENT_IMAGE_HOME = 'INCREMENT_IMAGE_HOME';
export const incrementImageAction = createAction(INCREMENT_IMAGE_HOME);

export const SET_CONFIG_FIREBASE = 'SET_CONFIG_FIREBASE';
export const setConfigFirebase = createAction<any>(SET_CONFIG_FIREBASE);
