import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { useNotificationStore } from '@/store/notification-store';

// Configure how notifications appear when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Register for push notifications
export async function registerForPushNotificationsAsync() {
  let token;
  
  // Check if device is physical (not simulator/emulator)
  if (Device.isDevice) {
    // Check current permission status
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    // If permission not determined, ask user
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    // Store permission status
    useNotificationStore.getState().setPermissionStatus(finalStatus);
    
    // If permission not granted, return
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return null;
    }
    
    // Get push token
    try {
      token = (await Notifications.getExpoPushTokenAsync({
        projectId: process.env.EXPO_PROJECT_ID, // You need to set this in app.json or .env
      })).data;
      
      console.log('Push token:', token);
      
      // Store token
      useNotificationStore.getState().setPushToken(token);
      useNotificationStore.getState().setIsRegistered(true);
    } catch (error) {
      console.error('Error getting push token:', error);
    }
  } else {
    console.log('Must use physical device for push notifications');
  }

  // Set notification channel for Android
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

// Add notification listeners
export function setupNotificationListeners(
  onNotification: (notification: Notifications.Notification) => void,
  onNotificationResponse: (response: Notifications.NotificationResponse) => void
) {
  // When notification is received while app is in foreground
  const notificationListener = Notifications.addNotificationReceivedListener(notification => {
    console.log('Notification received in foreground:', notification);
    onNotification(notification);
    
    // Add to notification store
    if (notification.request.content.title) {
      useNotificationStore.getState().addNotification({
        title: notification.request.content.title,
        body: notification.request.content.body || '',
        data: notification.request.content.data,
      });
    }
  });

  // When user taps on notification
  const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
    console.log('Notification response received:', response);
    onNotificationResponse(response);
    
    // Mark as read in store
    const notificationId = response.notification.request.identifier;
    const storeNotification = useNotificationStore.getState().notifications.find(
      n => n.id === notificationId
    );
    
    if (storeNotification) {
      useNotificationStore.getState().markAsRead(storeNotification.id);
    }
  });

  // Return cleanup function
  return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
}

// Schedule a local notification (for testing)
export async function scheduleLocalNotification(title: string, body: string, data: any = {}) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound: true,
      badge: 1,
    },
    trigger: {
      seconds: 1, // Show after 1 second
    },
  });
}

// Send push notification to a specific device (would typically be done from server)
export async function sendPushNotification(expoPushToken: string, title: string, body: string, data: any = {}) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title,
    body,
    data,
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}