import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Navigator, colors, screenWidth, sizes } from 'core';
import React, { memo, useCallback, useRef } from 'react';
import { DrawerLayoutAndroid } from 'react-native';
import { enableScreens } from 'react-native-screens';
import * as HomeScreen from 'screen/home';
import DrawerContent from './DrawerContent';
import TopTab from './TopTab';
import { NavigationButton } from 'component';
import { screenOptionsStack } from 'common/nagivationOption';
import { images } from 'assets';

enableScreens();
const Stack = createNativeStackNavigator();

const HomeStack: React.FC = () => {
	const drawer = useRef<DrawerLayoutAndroid>(null);

	const renderStackScreen = useCallback(() => {
		return Object.keys(HomeScreen).map((key: string, index: number) => (
			<Stack.Screen
				key={String(index)}
				name={key}
				options={Navigator.defaultOptions}
				component={(HomeScreen as any)[key]}
			/>
		));
	}, []);

	return (
		<DrawerLayoutAndroid
			ref={drawer}
			drawerWidth={screenWidth * 0.8}
			drawerPosition="left"
			drawerBackgroundColor={'rgba(51, 51, 51, 0.9)'}
			renderNavigationView={() => <DrawerContent drawerRef={drawer} />}
			drawerLockMode="locked-closed">
			<Stack.Navigator>
				<Stack.Screen
					name={'HomeTab'}
					component={TopTab}
					options={{
						...screenOptionsStack,
						headerShown: true,
						headerLeft: () => (
							<NavigationButton
								onPress={() => {
									drawer.current?.openDrawer();
								}}
								icon={images.ic_menu_left}
								tintColor="white"
								style={{ width: sizes.s24, height: sizes.s24, marginLeft: sizes.s16 }}
							/>
						),
						headerRight: () => (
							<NavigationButton
								icon={images.ic_search}
								tintColor="white"
								style={{ width: sizes.s20, height: sizes.s20, marginRight: sizes.s16 }}
							/>
						),

						headerTitleAlign: 'center',
						headerShadowVisible: false,
						headerTitleStyle: {
							color: 'white',
						},
						headerStyle: {
							backgroundColor: colors.background_black,
						},
					}}
				/>
				{renderStackScreen()}
			</Stack.Navigator>
		</DrawerLayoutAndroid>
	);
};

export default memo(HomeStack);
