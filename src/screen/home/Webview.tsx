/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { screenOptionsStack } from 'common/nagivationOption';
import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
const Webview = ({ navigation, route }: any) => {
	const { link, title } = route?.params || {};
	const [url, setUrl] = useState<string>('');

	useLayoutEffect(() => {
		navigation.setOptions({
			...screenOptionsStack,
			headerShown: true,
			title: title,
			headerTitleAlign: 'center',
			headerShadowVisible: false,
		});
		setUrl(link);
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<WebView
				originWhitelist={['*']}
				source={{
					uri: url,
				}}
			/>
		</View>
	);
};

export default Webview;
