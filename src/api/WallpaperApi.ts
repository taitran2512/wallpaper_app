import axiosClient from './axiosClient';

export default class WallpaperApi {
	static URL = {
		Category: '/categories/',
		Wallpaper: 'wallpapers',
	};

	static defaultParams = {
		populate: 'deep,3',
	};

	static getCategory = (): Promise<ResponseApi<CategoryType[]>> => {
		return axiosClient.get(this.URL.Category, { params: this.defaultParams });
	};

	static getListWallpaperByCategory = (
		categoryName: string,
		page: number = 1
	): Promise<ResponseApi<WallpaperType[]>> => {
		const params = {
			populate: 'deep,2',
			'filters[$and][0][category][name][$eq]': categoryName,
			'pagination[page]': page,
			'pagination[pageSize]': 15,
		};
		const url = `${this.URL.Wallpaper}?page=${page}&pageSize=20&sort=name:ASC&filters[$and][0][category][name][$eq]=${categoryName}`;
		return axiosClient.get(this.URL.Wallpaper, { params });
	};
}
