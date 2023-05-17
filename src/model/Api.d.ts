interface ResponseApi<T> {
	data: T;
	meta: Meta;
}

interface CategoryType {
	id: number;
	attributes: Attributes;
}

interface Thumbnail {
	data?: Data;
}

interface Data {
	id: number;
	attributes: Attributes2;
}

interface Attributes2 {
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

interface Meta {
	pagination: Pagination;
}

interface Pagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}
