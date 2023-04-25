import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { images } from 'assets';
import { colors, fonts, Navigator, sizes, strings, Style } from 'core';
import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Home } from 'screen/home';
import { Device } from 'utils';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
	const TabScreen = [
		{
			name: 'HomeTask',
			screen: Home,
			icon: images.ic_bottomTabTasknoHover,
			icon_selected: images.ic_bottomTabTask,
			label: strings.task,
			badge: 0,
		},
	];

	const renderTabScreen = () => {
		return TabScreen.map((tab: any, index: number) => (
			<Tab.Screen
				key={String(index)}
				name={tab.name}
				options={{
					...(Navigator.defaultOptions as any),
					lazy: false,
					tabBarStyle: {
						height: sizes.s56 + Device.getBottomSpace(),
					},
					tabBarShowLabel: false,
					tabBarButton: !tab?.screen
						? (props) => <TouchableOpacity {...props} onPress={tab?.onPress} />
						: undefined,
					tabBarIcon: ({ focused }) => (
						<View style={Style.column_between}>
							<View style={{ alignSelf: 'center' }}>
								<Image
									source={focused ? tab.icon_selected : tab.icon}
									style={Style.icon24}
								/>
								{(tab?.badge || 0) > 0 ? (
									<View style={styles.badge}>
										<Text style={styles.badge_text}>{tab.badge}</Text>
									</View>
								) : null}
							</View>
							<Text style={[styles.labelTab, focused && { color: colors.blue }]}>
								{tab.label}
							</Text>
						</View>
					),
				}}
				component={tab?.screen || View}
			/>
		));
	};

	return <Tab.Navigator>{renderTabScreen()}</Tab.Navigator>;
};

export default memo(BottomTab);

const styles = StyleSheet.create({
	badge: {
		position: 'absolute',
		top: -sizes.s10,
		right: -sizes.s10,
		backgroundColor: colors.orange,
		borderWidth: sizes.s1,
		borderColor: colors.white,
		borderRadius: sizes.s10,
		width: sizes.s20,
		height: sizes.s20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	badge_text: { ...Style.medium, fontSize: sizes.s10, color: colors.white },
	labelTab: {
		fontFamily: fonts.medium,
		fontSize: sizes.s11,
		color: colors.placeholder,
		marginTop: sizes.s2,
	},
});
