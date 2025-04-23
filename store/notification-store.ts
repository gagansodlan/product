import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export interface Notification {
  id: string;
  title: string;
  body: string;
  data?: any;
  read: boolean;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  pushToken: string | null;
  permissionStatus: Notifications.PermissionStatus | null;
  isRegistered: boolean;
  unreadCount: number;
  
  setPushToken: (token: string) => void;
  setPermissionStatus: (status: Notifications.PermissionStatus) => void;
  setIsRegistered: (isRegistered: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  getUnreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      pushToken: null,
      permissionStatus: null,
      isRegistered: false,
      unreadCount: 0,
      
      setPushToken: (token) => {
        set({ pushToken: token });
      },
      
      setPermissionStatus: (status) => {
        set({ permissionStatus: status });
      },
      
      setIsRegistered: (isRegistered) => {
        set({ isRegistered });
      },
      
      addNotification: (notification) => {
        const { notifications } = get();
        const newNotification: Notification = {
          id: Date.now().toString(),
          ...notification,
          read: false,
          createdAt: new Date().toISOString(),
        };
        
        set({ 
          notifications: [newNotification, ...notifications],
          unreadCount: get().unreadCount + 1
        });
      },
      
      markAsRead: (id) => {
        const { notifications } = get();
        const updatedNotifications = notifications.map(notification => 
          notification.id === id ? { ...notification, read: true } : notification
        );
        
        set({ 
          notifications: updatedNotifications,
          unreadCount: get().getUnreadCount()
        });
      },
      
      markAllAsRead: () => {
        const { notifications } = get();
        const updatedNotifications = notifications.map(notification => ({ ...notification, read: true }));
        
        set({ notifications: updatedNotifications, unreadCount: 0 });
      },
      
      removeNotification: (id) => {
        const { notifications } = get();
        const updatedNotifications = notifications.filter(notification => notification.id !== id);
        
        set({ 
          notifications: updatedNotifications,
          unreadCount: get().getUnreadCount()
        });
      },
      
      clearAllNotifications: () => {
        set({ notifications: [], unreadCount: 0 });
      },
      
      getUnreadCount: () => {
        const { notifications } = get();
        return notifications.filter(notification => !notification.read).length;
      },
    }),
    {
      name: 'notification-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        notifications: state.notifications,
        pushToken: state.pushToken,
        isRegistered: state.isRegistered,
      }),
    }
  )
);