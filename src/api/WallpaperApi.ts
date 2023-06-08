import axiosClient from './axiosClient';

export default class WallpaperApi {
	static URL = {
		Category: '/categories/',
		Wallpaper: 'wallpapers',
	};

	static defaultParams = {
		populate: 'deep,3',
		sort: 'name:asc',
		'pagination[page]': 1,
		'pagination[pageSize]': 2000,
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
			// sort: 'download_count:desc',
		};

		return axiosClient.get(this.URL.Wallpaper, { params });
	};

	static updateCountSetWallpaper = (id: number, count: number) => {
		const data = {
			download_count: count,
		};

		return axiosClient.put(`${this.URL.Wallpaper}/${id}`, { data });
	};
}
