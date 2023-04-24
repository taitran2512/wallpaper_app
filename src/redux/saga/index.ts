import { all } from 'redux-saga/effects';
import authenSaga from './authenSaga';
import taskSaga from './taskSaga';

export function* rootSaga() {
	yield all([authenSaga(), taskSaga()]);
}
