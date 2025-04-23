import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShoppingBag, ArrowRight } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useCartStore } from '@/store/cart-store';
import { useAuthStore } from '@/store/auth-store';
import { CartItemComponent } from '@/components/ui/CartItem';
import { Button } from '@/components/ui/Button';

export default function CartScreen() {
  const router = useRouter();
  const colors = useThemeStore(state => state.colors);
  const { items, clearCart, getCartTotal } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      Alert.alert(
        "Sign In Required",
        "Please sign in to continue with checkout",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "Sign In", 
            onPress: () => router.push('/(auth)/login')
          }
        ]
      );
      return;
    }
    
    router.push('/checkout');
  };
  
  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items from your cart?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Clear", 
          onPress: () => clearCart(),
          style: "destructive"
        }
      ]
    );
  };
  
  if (items.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.emptyContainer}>
          <ShoppingBag size={64} color={colors.secondaryText} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Your cart is empty
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.secondaryText }]}>
            Looks like you haven't added any products to your cart yet.
          </Text>
          <Button
            title="Start Shopping"
            onPress={() => router.push('/')}
            style={styles.startShoppingButton}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Shopping Cart ({items.length})
        </Text>
        <TouchableOpacity onPress={handleClearCart}>
          <Text style={[styles.clearText, { color: colors.error }]}>
            Clear All
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.itemsContainer}>
        {items.map((item) => (
          <CartItemComponent key={item.id} item={item} />
        ))}
      </ScrollView>
      
      <View style={[styles.summaryContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.secondaryText }]}>
            Subtotal
          </Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            ${subtotal.toFixed(2)}
          </Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.secondaryText }]}>
            Shipping
          </Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.secondaryText }]}>
            Tax (8%)
          </Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            ${tax.toFixed(2)}
          </Text>
        </View>
        
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        
        <View style={styles.summaryRow}>
          <Text style={[styles.totalLabel, { color: colors.text }]}>
            Total
          </Text>
          <Text style={[styles.totalValue, { color: colors.text }]}>
            ${total.toFixed(2)}
          </Text>
        </View>
        
        <Button
          title="Proceed to Checkout"
          onPress={handleCheckout}
          rightIcon={<ArrowRight size={18} color="#FFFFFF" />}
          style={styles.checkoutButton}
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
  clearText: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemsContainer: {
    flex: 1,
  },
  summaryContainer: {
    padding: 16,
    borderTopWidth: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 16,
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
  startShoppingButton: {
    width: '80%',
  },
});