import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Package, 
  Truck, 
  MapPin, 
  CreditCard, 
  ChevronRight, 
  ArrowRight 
} from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { Button } from '@/components/ui/Button';
import { getOrderById } from '@/mocks/users';
import { Order } from '@/types';

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colors = useThemeStore(state => state.colors);
  
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  
  useEffect(() => {
    loadOrder();
  }, [id]);
  
  const loadOrder = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const foundOrder = getOrderById(id as string);
      setOrder(foundOrder || null);
      setIsLoading(false);
    }, 1000);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const getStatusColor = (status: string) => {
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
  
  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  
  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }
  
  if (!order) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>
            Order not found
          </Text>
          <Button
            title="Go Back"
            onPress={() => router.back()}
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Order Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.orderId, { color: colors.text }]}>
              Order #{order.id.slice(-8)}
            </Text>
            <Text style={[styles.orderDate, { color: colors.secondaryText }]}>
              Placed on {formatDate(order.createdAt)}
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
        
        {/* Order Tracking */}
        {(order.status === 'shipped' || order.status === 'delivered') && (
          <View style={[styles.section, { borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Truck size={20} color={colors.primary} style={styles.sectionIcon} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Tracking Information
                </Text>
              </View>
              
              <TouchableOpacity>
                <Text style={[styles.trackButton, { color: colors.primary }]}>
                  Track
                </Text>
              </TouchableOpacity>
            </View>
            
            <Text style={[styles.trackingNumber, { color: colors.text }]}>
              {order.trackingNumber}
            </Text>
            
            <Text style={[styles.trackingInfo, { color: colors.secondaryText }]}>
              {order.status === 'delivered' 
                ? 'Your order was delivered on ' + formatDate(order.updatedAt)
                : 'Your order is on the way. Expected delivery in 2-3 days.'}
            </Text>
          </View>
        )}
        
        {/* Order Items */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <View style={styles.sectionTitleContainer}>
            <Package size={20} color={colors.primary} style={styles.sectionIcon} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Items ({order.items.length})
            </Text>
          </View>
          
          {order.items.map((item) => (
            <View 
              key={item.id} 
              style={[styles.orderItem, { borderColor: colors.border }]}
            >
              <Image 
                source={{ uri: item.image }} 
                style={styles.itemImage} 
              />
              
              <View style={styles.itemDetails}>
                <Text style={[styles.itemName, { color: colors.text }]} numberOfLines={2}>
                  {item.name}
                </Text>
                
                <View style={styles.itemPriceRow}>
                  <Text style={[styles.itemPrice, { color: colors.text }]}>
                    ${item.price.toFixed(2)}
                  </Text>
                  <Text style={[styles.itemQuantity, { color: colors.secondaryText }]}>
                    Qty: {item.quantity}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        
        {/* Shipping Address */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <View style={styles.sectionTitleContainer}>
            <MapPin size={20} color={colors.primary} style={styles.sectionIcon} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Shipping Address
            </Text>
          </View>
          
          <Text style={[styles.addressText, { color: colors.text }]}>
            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
          </Text>
          <Text style={[styles.addressText, { color: colors.secondaryText }]}>
            {order.shippingAddress.address1}
            {order.shippingAddress.address2 ? `, ${order.shippingAddress.address2}` : ''}
          </Text>
          <Text style={[styles.addressText, { color: colors.secondaryText }]}>
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
          </Text>
          <Text style={[styles.addressText, { color: colors.secondaryText }]}>
            {order.shippingAddress.country}
          </Text>
          <Text style={[styles.addressText, { color: colors.secondaryText }]}>
            {order.shippingAddress.phone}
          </Text>
        </View>
        
        {/* Payment Information */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <View style={styles.sectionTitleContainer}>
            <CreditCard size={20} color={colors.primary} style={styles.sectionIcon} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Payment Information
            </Text>
          </View>
          
          <Text style={[styles.paymentMethod, { color: colors.text }]}>
            Visa •••• 4242
          </Text>
          
          <View style={[styles.summaryContainer, { backgroundColor: colors.card }]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.secondaryText }]}>
                Subtotal
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                ${order.subtotal.toFixed(2)}
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.secondaryText }]}>
                Shipping
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.secondaryText }]}>
                Tax
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                ${order.tax.toFixed(2)}
              </Text>
            </View>
            
            {order.discount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.secondaryText }]}>
                  Discount
                </Text>
                <Text style={[styles.summaryValue, { color: colors.success }]}>
                  -${order.discount.toFixed(2)}
                </Text>
              </View>
            )}
            
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            
            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: colors.text }]}>
                Total
              </Text>
              <Text style={[styles.totalValue, { color: colors.text }]}>
                ${order.total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        
        {/* Actions */}
        <View style={styles.actionsContainer}>
          <Button
            title="Need Help?"
            variant="outline"
            style={styles.helpButton}
            onPress={() => {}}
          />
          
          {order.status !== 'cancelled' && order.status !== 'refunded' && (
            <Button
              title="Buy Again"
              rightIcon={<ArrowRight size={18} color="#FFFFFF" />}
              style={styles.buyAgainButton}
              onPress={() => {}}
            />
          )}
        </View>
      </ScrollView>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 16,
  },
  backButton: {
    width: '50%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  orderId: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  orderDate: {
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
  section: {
    padding: 16,
    borderTopWidth: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  trackButton: {
    fontSize: 14,
    fontWeight: '500',
  },
  trackingNumber: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  trackingInfo: {
    fontSize: 14,
  },
  orderItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  itemPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemQuantity: {
    fontSize: 14,
  },
  addressText: {
    fontSize: 14,
    marginBottom: 4,
  },
  paymentMethod: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  summaryContainer: {
    padding: 16,
    borderRadius: 8,
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
  actionsContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 0,
  },
  helpButton: {
    flex: 1,
    marginRight: 8,
  },
  buyAgainButton: {
    flex: 1,
    marginLeft: 8,
  },
});