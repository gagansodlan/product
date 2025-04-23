import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle, Package } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { Button } from '@/components/ui/Button';

export default function OrderConfirmationScreen() {
  const router = useRouter();
  const colors = useThemeStore(state => state.colors);
  
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const handleContinueShopping = () => {
    router.replace('/');
  };
  
  const handleViewOrder = () => {
    router.replace('/account/orders');
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.successContainer}>
          <CheckCircle size={80} color={colors.success} />
          <Text style={[styles.successTitle, { color: colors.text }]}>
            Order Confirmed!
          </Text>
          <Text style={[styles.successMessage, { color: colors.secondaryText }]}>
            Your order has been placed successfully. We'll send you a confirmation email shortly.
          </Text>
        </View>
        
        <View style={[styles.orderInfoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.orderInfoRow}>
            <Text style={[styles.orderInfoLabel, { color: colors.secondaryText }]}>
              Order Number:
            </Text>
            <Text style={[styles.orderInfoValue, { color: colors.text }]}>
              {orderNumber}
            </Text>
          </View>
          
          <View style={styles.orderInfoRow}>
            <Text style={[styles.orderInfoLabel, { color: colors.secondaryText }]}>
              Date:
            </Text>
            <Text style={[styles.orderInfoValue, { color: colors.text }]}>
              {orderDate}
            </Text>
          </View>
          
          <View style={styles.orderInfoRow}>
            <Text style={[styles.orderInfoLabel, { color: colors.secondaryText }]}>
              Payment Method:
            </Text>
            <Text style={[styles.orderInfoValue, { color: colors.text }]}>
              Visa •••• 4242
            </Text>
          </View>
        </View>
        
        <View style={styles.trackingContainer}>
          <Package size={24} color={colors.primary} style={styles.trackingIcon} />
          <Text style={[styles.trackingText, { color: colors.text }]}>
            You can track your order status in the "My Orders" section of your account.
          </Text>
        </View>
        
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' }}
          style={styles.promoImage}
          resizeMode="cover"
        />
        
        <View style={styles.buttonsContainer}>
          <Button
            title="Continue Shopping"
            variant="outline"
            onPress={handleContinueShopping}
            style={styles.continueButton}
          />
          
          <Button
            title="View Order"
            onPress={handleViewOrder}
            style={styles.viewOrderButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  successContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  orderInfoCard: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 24,
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderInfoLabel: {
    fontSize: 14,
  },
  orderInfoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  trackingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  trackingIcon: {
    marginRight: 12,
  },
  trackingText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  promoImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 32,
  },
  buttonsContainer: {
    width: '100%',
  },
  continueButton: {
    marginBottom: 12,
  },
  viewOrderButton: {
  },
});