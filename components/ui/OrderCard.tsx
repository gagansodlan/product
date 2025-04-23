import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Package, ChevronRight } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { Order } from '@/types';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const router = useRouter();
  const colors = useThemeStore(state => state.colors);
  
  const handlePress = () => {
    router.push(`/account/orders/${order.id}`);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return colors.success;
      case 'shipped':
        return colors.primary;
      case 'processing':
        return colors.warning;
      case 'cancelled':
      case 'refunded':
        return colors.error;
      default:
        return colors.secondaryText;
    }
  };
  
  const getStatusText = (status: Order['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.orderInfo}>
          <Text style={[styles.orderId, { color: colors.text }]}>
            Order #{order.id.slice(-8)}
          </Text>
          <Text style={[styles.date, { color: colors.secondaryText }]}>
            {formatDate(order.createdAt)}
          </Text>
        </View>
        
        <View style={[
          styles.statusContainer, 
          { backgroundColor: getStatusColor(order.status) + '20' }
        ]}>
          <Text style={[
            styles.statusText, 
            { color: getStatusColor(order.status) }
          ]}>
            {getStatusText(order.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.itemsContainer}>
        <Text style={[styles.itemsText, { color: colors.secondaryText }]}>
          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
        </Text>
        
        <View style={styles.priceContainer}>
          <Text style={[styles.totalLabel, { color: colors.secondaryText }]}>
            Total:
          </Text>
          <Text style={[styles.totalPrice, { color: colors.text }]}>
            ${order.total.toFixed(2)}
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <Package size={16} color={colors.primary} />
          <Text style={[styles.trackingText, { color: colors.text }]}>
            {order.trackingNumber ? `Tracking: ${order.trackingNumber}` : 'No tracking available'}
          </Text>
        </View>
        
        <ChevronRight size={20} color={colors.secondaryText} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
  },
  statusContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemsText: {
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    marginRight: 4,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackingText: {
    fontSize: 14,
    marginLeft: 8,
  },
});