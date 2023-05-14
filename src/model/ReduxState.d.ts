import { AppState } from 'redux/reducer/appReducer';
import { AuthenState } from 'redux/reducer/authenReducer';

export interface RootState {
	authen: AuthenState;
	app: AppState;
}
