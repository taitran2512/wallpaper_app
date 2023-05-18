import axiosClient from './axiosClient';

export default class ConfigApi {
	static URL = {
		config: '/key-config-ads',
	};

	static defaultParams = {
		populate: 'deep,3',
	};

	static getConfig = () => {
		return axiosClient.get(this.URL.config, { params: this.defaultParams });
	};
}
