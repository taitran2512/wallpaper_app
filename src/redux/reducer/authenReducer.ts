import { AnyAction } from '@reduxjs/toolkit';
import * as ActionType from 'action/authenAction';
import { setApiToken } from 'api/axiosClient';
import { Navigator } from 'core';
import { Storage } from 'utils';

export interface AuthenState {}

const initialState: AuthenState = {};

export const authenReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case ActionType.LOG_OUT:
			logOut();
			return {
				...initialState,
			};
		default:
			return state;
	}
};

const logOut = async () => {
	const arrKey = Object.keys(Storage.key);
	setApiToken('');
	await Storage.multiRemoveData(arrKey);
	Navigator.goLogin();
};
