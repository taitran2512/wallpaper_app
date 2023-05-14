import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from './appReducer';
import { authenReducer } from './authenReducer';

const rootReducer = combineReducers({
	authen: authenReducer,
	app: appReducer,
});
export { rootReducer };
