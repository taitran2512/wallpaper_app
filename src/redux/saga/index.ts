import { all } from 'redux-saga/effects';
import authenSaga from './authenSaga';

export function* rootSaga() {
	yield all([authenSaga()]);
}
