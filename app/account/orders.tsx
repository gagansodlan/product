import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Package } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useAuthStore } from '@/store/auth-store';
import { OrderCard } from '@/components/ui/OrderCard';
import { Button } from '@/components/ui/Button';
import { getUserOrders } from '@/mocks/users';

export default function OrdersScreen() {
  const router = useRouter();
  const colors = useThemeStore(state => state.colors);
  const { user } = useAuthStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    loadOrders();
  }, []);
  
  const loadOrders = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (user) {
        const userOrders = getUserOrders(user.id);
        setOrders(userOrders);
      }
      setIsLoading(false);
    }, 1000);
  };
  
  const handleContinueShopping = () => {
    router.replace('/');
  };
  
  const renderOrderItem = ({ item }) => (
    <OrderCard order={item} />
  );
  
  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }
  
  if (orders.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.emptyContainer}>
          <Package size={64} color={colors.secondaryText} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            No Orders Yet
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.secondaryText }]}>
            You haven't placed any orders yet. Start shopping to see your orders here.
          </Text>
          <Button
            title="Start Shopping"
            onPress={handleContinueShopping}
            style={styles.shopButton}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
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
  shopButton: {
    width: '80%',
  },
});