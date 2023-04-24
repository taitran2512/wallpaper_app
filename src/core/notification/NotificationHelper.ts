import {
	Notifications,
	Notification,
	NotificationCompletion,
	NotificationBackgroundFetchResult,
} from 'react-native-notifications';
import { NotificationActionResponse } from 'react-native-notifications/lib/dist/interfaces/NotificationActionResponse';
import { NotificationPermissionOptions } from 'react-native-notifications/lib/dist/interfaces/NotificationPermissions';
import messaging from '@react-native-firebase/messaging';

class NotificationHelper {
	static messageId: string;
	static init() {
		this.getDeviceToken();
		this.requestUserPermission();
		this.requestPermissions();
		this.registerNotifications();
	}

	static registerNotifications = () => {
		Notifications.registerRemoteNotifications();

		// foreground
		Notifications.events().registerNotificationReceivedForeground(
			(notification: Notification, completion: (response: NotificationCompletion) => void) => {
				if (notification.payload['gcm.message_id'] !== this.messageId) {
					console.log('Notification Received - Foreground', notification.payload);
					this.messageId = notification.payload.messageId;
				}
				// Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
				completion({ alert: true, sound: true, badge: false });
			}
		);

		// backround
		Notifications.events().registerNotificationReceivedBackground(
			(
				notification: Notification,
				completion: (response: NotificationBackgroundFetchResult) => void
			) => {
				console.log('Notification Received - Background', notification?.payload);
				completion(NotificationBackgroundFetchResult.NO_DATA);
			}
		);

		Notifications.events().registerNotificationOpened(
			(
				notification: Notification,
				completion: () => void,
				action?: NotificationActionResponse
			) => {
				console.log('Notification on press::', notification?.payload, '\naction::', action);
				completion();
			}
		);

		messaging().setBackgroundMessageHandler(async (message) => {
			console.log('Message handled in the background!', message);
		});

		messaging().onMessage(async (remoteMessage) => {
			Notifications.postLocalNotification({
				body: remoteMessage?.notification?.body,
				title: remoteMessage?.notification?.title,
			} as Notification);
		});
	};

	static requestUserPermission = async () => {
		const authStatus = await messaging().requestPermission();
		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;

		if (enabled) {
			console.log('Authorization status:', authStatus);
		}
	};

	static getDeviceToken = async () => {
		try {
			const token = await messaging().getToken();
			console.log('DEVICE_TOKEN:', token);
			return token;
		} catch (error) {
			return '';
		}
	};

	static getInitialNotification = () => {
		return Notifications.getInitialNotification();
	};

	static requestPermissions = () => {
		Notifications.registerRemoteNotifications();
	};

	static requestPermissionsIos = (options: Array<keyof NotificationPermissionOptions>) => {
		Notifications.ios.registerRemoteNotifications(
			Object.fromEntries(options.map((opt) => [opt, true]))
		);
	};

	static checkPermissionIos = () => {
		Notifications.ios.checkPermissions().then((currentPermissions) => {
			console.log('Badges enabled: ' + !!currentPermissions.badge);
			console.log('Sounds enabled: ' + !!currentPermissions.sound);
			console.log('Alerts enabled: ' + !!currentPermissions.alert);
			console.log('Car Play enabled: ' + !!currentPermissions.carPlay);
			console.log('Critical Alerts enabled: ' + !!currentPermissions.criticalAlert);
			console.log('Provisional enabled: ' + !!currentPermissions.provisional);
			console.log(
				'Provides App Notification Settings enabled: ' +
					!!currentPermissions.providesAppNotificationSettings
			);
			console.log('Announcement enabled: ' + !!currentPermissions.announcement);
		});
	};

	static removeAllDeliveredNotifications = () => {
		Notifications.removeAllDeliveredNotifications();
	};
}

export default NotificationHelper;
