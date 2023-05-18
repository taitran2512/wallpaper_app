interface ResponseApi<T> {
	data: T;
	meta: Meta;
}

interface Meta {
	pagination: Pagination;
}

interface Pagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

////////////////////////////////////////////////////////////////////////////////////
interface WallpaperType {
	id: number;
	name: any;
	download_count: number;
	is_premium: boolean;
	createdAt: string;
	updatedAt: string;
	media: Media;
	category: Category;
}

interface Media {
	id: number;
	name: string;
	alternativeText: any;
	caption: any;
	width: number;
	height: number;
	formats: Formats;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: any;
	provider: string;
	provider_metadata: any;
	createdAt: string;
	updatedAt: string;
}

interface Formats {
	large: Large;
	small: Small;
	medium: Medium;
	thumbnail: Thumbnail;
}

interface Large {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: any;
	size: number;
	width: number;
	height: number;
}

interface Small {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: any;
	size: number;
	width: number;
	height: number;
}

interface Medium {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: any;
	size: number;
	width: number;
	height: number;
}

interface Thumbnail {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: any;
	size: number;
	width: number;
	height: number;
}

interface Category {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
}

/////////////////////////////////////////////////////////////////////////
interface CategoryType {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
	thumbnail: Thumbnail;
	image_count: number;
}

interface Thumbnail {
	id: number;
	name: string;
	alternativeText: any;
	caption: any;
	width: number;
	height: number;
	formats: Formats;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: any;
	provider: string;
	provider_metadata: any;
	createdAt: string;
	updatedAt: string;
}

interface Formats {
	thumbnail: Thumbnail2;
}

interface Thumbnail2 {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: any;
	size: number;
	width: number;
	height: number;
}
