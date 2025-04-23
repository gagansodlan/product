import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Trash2, CheckCircle, ShoppingBag, Package, Tag, Info } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useNotificationStore, Notification } from '@/store/notification-store';
import { Button } from '@/components/ui/Button';
import { scheduleLocalNotification } from '@/utils/notifications';

export default function NotificationsScreen() {
  const router = useRouter();
  const colors = useThemeStore(state => state.colors);
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAllNotifications,
    unreadCount
  } = useNotificationStore();
  
  // Mark all as read when screen is focused
  useEffect(() => {
    if (unreadCount > 0) {
      markAllAsRead();
    }
  }, []);
  
  const handleNotificationPress = (notification: Notification) => {
    // Mark as read if not already
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    // Navigate based on notification type/data
    if (notification.data) {
      if (notification.data.type === 'order') {
        router.push(`/account/orders/${notification.data.orderId}`);
      } else if (notification.data.type === 'product') {
        router.push(`/product/${notification.data.productId}`);
      }
    }
  };
  
  const handleClearAll = () => {
    if (notifications.length === 0) return;
    
    Alert.alert(
      "Clear Notifications",
      "Are you sure you want to clear all notifications?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Clear All", 
          onPress: () => clearAllNotifications(),
          style: "destructive"
        }
      ]
    );
  };
  
  const handleDeleteNotification = (id: string) => {
    removeNotification(id);
  };
  
  const handleTestNotification = () => {
    scheduleLocalNotification(
      "New Order Placed",
      "Your order #12345 has been confirmed and is being processed.",
      { type: 'order', orderId: 'order-1' }
    );
  };
  
  const getNotificationIcon = (notification: Notification) => {
    if (!notification.data || !notification.data.type) {
      return <Info size={24} color={colors.primary} />;
    }
    
    switch (notification.data.type) {
      case 'order':
        return <Package size={24} color={colors.primary} />;
      case 'product':
        return <Tag size={24} color={colors.secondary} />;
      case 'promo':
        return <ShoppingBag size={24} color={colors.warning} />;
      default:
        return <Info size={24} color={colors.primary} />;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.read && { backgroundColor: colors.primary + '10' },
        { borderColor: colors.border }
      ]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationIcon}>
        {getNotificationIcon(item)}
      </View>
      
      <View style={styles.notificationContent}>
        <Text style={[styles.notificationTitle, { color: colors.text }]}>
          {item.title}
        </Text>
        
        <Text style={[styles.notificationBody, { color: colors.secondaryText }]} numberOfLines={2}>
          {item.body}
        </Text>
        
        <Text style={[styles.notificationTime, { color: colors.secondaryText }]}>
          {formatDate(item.createdAt)}
        </Text>
      </View>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteNotification(item.id)}
      >
        <Trash2 size={18} color={colors.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  
  if (notifications.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Notifications
          </Text>
          
          <TouchableOpacity onPress={handleTestNotification}>
            <Text style={[styles.testButton, { color: colors.primary }]}>
              Test Notification
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.emptyContainer}>
          <Bell size={64} color={colors.secondaryText} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            No Notifications
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.secondaryText }]}>
            You don't have any notifications yet. We'll notify you about orders, promotions, and more.
          </Text>
          <Button
            title="Send Test Notification"
            onPress={handleTestNotification}
            style={styles.testNotificationButton}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Notifications
        </Text>
        
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={[styles.clearAllText, { color: colors.error }]}>
            Clear All
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={styles.testButtonContainer}>
        <Button
          title="Send Test Notification"
          variant="outline"
          size="small"
          onPress={handleTestNotification}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  clearAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  testButton: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  notificationIcon: {
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationBody: {
    fontSize: 14,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
  },
  deleteButton: {
    padding: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  testNotificationButton: {
    width: '80%',
  },
  testButtonContainer: {
    padding: 16,
    alignItems: 'center',
  },
});