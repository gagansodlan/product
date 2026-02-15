import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import { ErrorBoundary } from "./error-boundary";
import { useThemeStore } from "@/store/theme-store";
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, setupNotificationListeners } from "@/utils/notifications";
import { useNotificationStore } from "@/store/notification-store";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};





// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });
  
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  
  // Set up push notifications
  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync();
    
    // Set up notification listeners
    const cleanup = setupNotificationListeners(
      (notification) => {
        // Handle notification received while app is in foreground
        console.log('Notification received in foreground:', notification);
      },
      (response) => {
        // Handle notification response (user tapped notification)
        console.log('User tapped notification:', response);
        
        // You can navigate to specific screens based on notification data here
        const data = response.notification.request.content.data;
        if (data && data.screen) {
          // router.push(data.screen);
        }
      }
    );
    
    
    return cleanup;
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <RootLayoutNav />
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  const colors = useThemeStore(state => state.colors);
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="product/[id]" 
        options={{ 
          title: "Product Details",
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="category/[id]" 
        options={{ 
          title: "Category",
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="search" 
        options={{ 
          title: "Search",
          presentation: "modal",
        }} 
      />
      <Stack.Screen 
        name="checkout" 
        options={{ 
          title: "Checkout",
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="order-confirmation" 
        options={{ 
          title: "Order Confirmation",
          headerBackVisible: false,
        }} 
      />
      <Stack.Screen 
        name="account/orders/[id]" 
        options={{ 
          title: "Order Details",
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="notifications" 
        options={{ 
          title: "Notifications",
          presentation: "card",
        }} 
      />
    </Stack>
  );
}