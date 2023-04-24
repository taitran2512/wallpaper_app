import { useEffect, useRef } from 'react';

export const useDidUpdate = (callback: () => void, dependencies?: any[]) => {
	const didmount = useRef(false);

	useEffect(() => {
		didmount.current = true;
		console.log('didmount');
	}, []);

	useEffect(() => {
		if (didmount.current) {
			callback?.();
			console.log('didupdata', didmount.current, dependencies);
		}
	}, dependencies);
};
