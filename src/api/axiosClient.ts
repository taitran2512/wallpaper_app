import { logOutAction } from 'action/authenAction';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import store from 'store';
import { BASE_URL } from 'utils/https';
import InternetHelper from 'utils/InternetHelper';
import LogUtil from 'utils/LogUtil';

let token: string = '';

export const setApiToken = (accessToken: string) => {
	token = accessToken;
};
export const getApiToken = () => token;

const axiosClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 30000,
});

axiosClient.interceptors.request.use(
	function (config: AxiosRequestConfig): any {
		if (!InternetHelper.isConnect()) {
			Promise.reject('No internet connection');
			return;
		}
		if (config.headers === undefined) {
			config.headers = {
				'Content-Type': 'application/json',
			};
		}
		if (token !== '') {
			config.headers.Authorization = 'Bearer ' + token;
		}
		console.log(
			config.method?.toUpperCase(),
			config.url,
			`\nbody: ${JSON.stringify(config?.data)}`,
			`\nparams: ${JSON.stringify(config?.params)}`
		);

		return config;
	},
	function (error: AxiosError) {
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosClient.interceptors.response.use(
	function (response: AxiosResponse) {
		LogUtil.i(response.data, `RESPONSE API: ${response.config.url} `);
		return response.data;
	},
	function (error: AxiosError) {
		// @ts-ignore
		if (error.response?.data?.error?.status === 401) {
			store.dispatch(logOutAction());
			InternetHelper.showAlert('Notice', 'Login session expired');
		}
		LogUtil.e(error.response?.data, `ERROR API: ${error.response?.config.url} `);

		return Promise.reject(error.response?.data);
	}
);
export default axiosClient;
