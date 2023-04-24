import { combineReducers } from '@reduxjs/toolkit'
import { authenReducer } from './authenReducer'

const rootReducer = combineReducers({
	authen: authenReducer,
})
export { rootReducer }
