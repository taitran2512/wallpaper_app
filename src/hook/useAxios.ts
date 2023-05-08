/* eslint-disable react-hooks/exhaustive-deps */
import { Navigator } from 'core/index';
import { useEffect, useState } from 'react';

interface Options {
	showLoading?: boolean;
	callDidMount?: boolean;
	apiPayload?: any;
}

export function useAxios<T>(fetcher: (data?: any) => Promise<any>, options?: Options) {
	const { showLoading = true, callDidMount, apiPayload } = options || {};
	const [response, setResponse] = useState<{ loading: boolean; response?: T | any; error?: any }>({
		loading: showLoading,
		response: undefined,
		error: undefined,
	});

	const callApi = async (data?: any) => {
		try {
			showLoading && Navigator.showLoading();
			const responseApi = await fetcher(data || apiPayload);
			setResponse({ response: responseApi, loading: false });
			return responseApi;
		} catch (errorApi: any) {
			setResponse({ error: errorApi, loading: false });
			return errorApi;
		} finally {
			Navigator.hideLoading();
		}
	};

	useEffect(() => {
		if (callDidMount) {
			callApi();
		}
	}, [callDidMount]);

	return {
		loading: response?.loading,
		error: response?.error,
		response: response?.response,
		callApi,
	};
}
