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
import { 
  MapPin, 
  CreditCard, 
  Truck, 
  ChevronRight, 
  Check, 
  ShoppingBag 
} from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useCartStore } from '@/store/cart-store';
import { Button } from '@/components/ui/Button';
import { CartItemComponent } from '@/components/ui/CartItem';
import { addresses, paymentMethods } from '@/mocks/users';

export default function CheckoutScreen() {
  const router = useRouter();
  const colors = useThemeStore(state => state.colors);
  const { items, getCartTotal, clearCart } = useCartStore();
  
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [isLoading, setIsLoading] = useState(false);
  
  const subtotal = getCartTotal();
  const shipping = selectedShipping === 'express' ? 15 : (subtotal > 100 ? 0 : 10);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  
  const handlePlaceOrder = () => {
    if (items.length === 0) {
      Alert.alert("Error", "Your cart is empty");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsLoading(false);
      clearCart();
      router.replace('/order-confirmation');
    }, 2000);
  };
  
  const handleAddressSelect = () => {
    // In a real app, this would navigate to an address selection screen
    Alert.alert("Select Address", "Address selection would be implemented here");
  };
  
  const handlePaymentSelect = () => {
    // In a real app, this would navigate to a payment method selection screen
    Alert.alert("Select Payment", "Payment method selection would be implemented here");
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Shipping Address */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <MapPin size={20} color={colors.primary} style={styles.sectionIcon} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Shipping Address
              </Text>
            </View>
            <TouchableOpacity onPress={handleAddressSelect}>
              <Text style={[styles.changeText, { color: colors.primary }]}>
                Change
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={[styles.addressCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.addressHeader}>
              <Text style={[styles.addressName, { color: colors.text }]}>
                {selectedAddress.firstName} {selectedAddress.lastName}
              </Text>
              {selectedAddress.isDefault && (
                <View style={[styles.defaultBadge, { backgroundColor: colors.primary + '20' }]}>
                  <Text style={[styles.defaultText, { color: colors.primary }]}>
                    Default
                  </Text>
                </View>
              )}
            </View>
            
            <Text style={[styles.addressText, { color: colors.secondaryText }]}>
              {selectedAddress.address1}
              {selectedAddress.address2 ? `, ${selectedAddress.address2}` : ''}
            </Text>
            <Text style={[styles.addressText, { color: colors.secondaryText }]}>
              {selectedAddress.city}, {selectedAddress.state} {selectedAddress.postalCode}
            </Text>
            <Text style={[styles.addressText, { color: colors.secondaryText }]}>
              {selectedAddress.country}
            </Text>
            <Text style={[styles.addressText, { color: colors.secondaryText }]}>
              {selectedAddress.phone}
            </Text>
          </View>
        </View>
        
        {/* Payment Method */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <CreditCard size={20} color={colors.primary} style={styles.sectionIcon} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Payment Method
              </Text>
            </View>
            <TouchableOpacity onPress={handlePaymentSelect}>
              <Text style={[styles.changeText, { color: colors.primary }]}>
                Change
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={[styles.paymentCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {selectedPayment.type === 'card' ? (
              <>
                <View style={styles.cardInfo}>
                  <Text style={[styles.cardBrand, { color: colors.text }]}>
                    {selectedPayment.details.brand}
                  </Text>
                  <Text style={[styles.cardNumber, { color: colors.secondaryText }]}>
                    •••• {selectedPayment.details.last4}
                  </Text>
                </View>
                <Text style={[styles.cardExpiry, { color: colors.secondaryText }]}>
                  Expires {selectedPayment.details.expMonth}/{selectedPayment.details.expYear}
                </Text>
              </>
            ) : (
              <Text style={[styles.paypalEmail, { color: colors.text }]}>
                PayPal - {selectedPayment.details.email}
              </Text>
            )}
          </View>
        </View>
        
        {/* Shipping Method */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <View style={styles.sectionTitleContainer}>
            <Truck size={20} color={colors.primary} style={styles.sectionIcon} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Shipping Method
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[
              styles.shippingOption, 
              selectedShipping === 'standard' && [styles.selectedShipping, { borderColor: colors.primary }],
              { backgroundColor: colors.card, borderColor: colors.border }
            ]}
            onPress={() => setSelectedShipping('standard')}
          >
            <View style={styles.shippingOptionContent}>
              <Text style={[styles.shippingName, { color: colors.text }]}>
                Standard Shipping
              </Text>
              <Text style={[styles.shippingDescription, { color: colors.secondaryText }]}>
                Delivery in 3-5 business days
              </Text>
            </View>
            <View style={styles.shippingPriceContainer}>
              <Text style={[styles.shippingPrice, { color: colors.text }]}>
                {subtotal > 100 ? 'Free' : '$10.00'}
              </Text>
              {selectedShipping === 'standard' && (
                <View style={[styles.checkCircle, { backgroundColor: colors.primary }]}>
                  <Check size={14} color="#FFFFFF" />
                </View>
              )}
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.shippingOption, 
              selectedShipping === 'express' && [styles.selectedShipping, { borderColor: colors.primary }],
              { backgroundColor: colors.card, borderColor: colors.border }
            ]}
            onPress={() => setSelectedShipping('express')}
          >
            <View style={styles.shippingOptionContent}>
              <Text style={[styles.shippingName, { color: colors.text }]}>
                Express Shipping
              </Text>
              <Text style={[styles.shippingDescription, { color: colors.secondaryText }]}>
                Delivery in 1-2 business days
              </Text>
            </View>
            <View style={styles.shippingPriceContainer}>
              <Text style={[styles.shippingPrice, { color: colors.text }]}>
                $15.00
              </Text>
              {selectedShipping === 'express' && (
                <View style={[styles.checkCircle, { backgroundColor: colors.primary }]}>
                  <Check size={14} color="#FFFFFF" />
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Order Summary */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <View style={styles.sectionTitleContainer}>
            <ShoppingBag size={20} color={colors.primary} style={styles.sectionIcon} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Order Summary
            </Text>
          </View>
          
          <View style={styles.orderItems}>
            {items.map((item) => (
              <CartItemComponent key={item.id} item={item} />
            ))}
          </View>
          
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
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Action Bar */}
      <View style={[styles.actionBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.totalContainer}>
          <Text style={[styles.actionBarTotalLabel, { color: colors.secondaryText }]}>
            Total
          </Text>
          <Text style={[styles.actionBarTotal, { color: colors.text }]}>
            ${total.toFixed(2)}
          </Text>
        </View>
        
        <Button
          title="Place Order"
          onPress={handlePlaceOrder}
          isLoading={isLoading}
          style={styles.placeOrderButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  addressCard: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  defaultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    fontSize: 10,
    fontWeight: '500',
  },
  addressText: {
    fontSize: 14,
    marginBottom: 2,
  },
  paymentCard: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardBrand: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  cardNumber: {
    fontSize: 14,
  },
  cardExpiry: {
    fontSize: 14,
  },
  paypalEmail: {
    fontSize: 16,
    fontWeight: '500',
  },
  shippingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  selectedShipping: {
    borderWidth: 2,
  },
  shippingOptionContent: {
    flex: 1,
  },
  shippingName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  shippingDescription: {
    fontSize: 14,
  },
  shippingPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shippingPrice: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderItems: {
    marginBottom: 16,
  },
  summaryContainer: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
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
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
  },
  totalContainer: {
  },
  actionBarTotalLabel: {
    fontSize: 12,
  },
  actionBarTotal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeOrderButton: {
    width: '60%',
  },
});