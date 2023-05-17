import axiosClient from './axiosClient';

export default class WallpaperApi {
	static URL = {
		Category: '/categories',
	};

	static defaultParams = {
		populate: 'deep,3',
	};

	static getCategory = () => {
		return axiosClient.get(this.URL.Category, { params: this.defaultParams });
	};
}
