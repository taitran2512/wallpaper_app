import React from 'react';
import { StyleSheet, View, WebView } from 'react-native';
const Webview = () => {
	return (
		<View>
			<WebView
				source={{
					uri: 'https://github.com/facebook/react-native',
				}}
				style={{ marginTop: 20 }}
			/>
		</View>
	);
};

export default Webview;

const styles = StyleSheet.create({});
