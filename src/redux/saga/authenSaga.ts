/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction } from '@reduxjs/toolkit';
import * as Actions from 'action/authenAction';
import { takeLatest } from 'redux-saga/effects';
/**===========LOGIN================== */
function* loginSaga(action: PayloadAction<LoginPayload>) {}

export default function* () {
	yield takeLatest(Actions.LOGIN, loginSaga);
}
