import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useCartStore } from '@/store/cart-store';
import { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
}

export const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const colors = useThemeStore(state => state.colors);
  const { updateQuantity, removeItem } = useCartStore();
  
  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };
  
  const handleRemove = () => {
    removeItem(item.id);
  };
  
  return (
    <View style={[styles.container, { borderColor: colors.border }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
          {item.name}
        </Text>
        
        {item.attributes && Object.keys(item.attributes).length > 0 && (
          <Text style={[styles.attributes, { color: colors.secondaryText }]}>
            {Object.entries(item.attributes)
              .map(([key, value]) => `${key}: ${value}`)
              .join(', ')}
          </Text>
        )}
        
        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: colors.text }]}>
            ${item.price.toFixed(2)}
          </Text>
          
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={[styles.quantityButton, { borderColor: colors.border }]}
              onPress={handleDecrement}
            >
              <Minus size={16} color={colors.text} />
            </TouchableOpacity>
            
            <Text style={[styles.quantity, { color: colors.text }]}>
              {item.quantity}
            </Text>
            
            <TouchableOpacity 
              style={[styles.quantityButton, { borderColor: colors.border }]}
              onPress={handleIncrement}
            >
              <Plus size={16} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={handleRemove}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Trash2 size={18} color={colors.error} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  attributes: {
    fontSize: 12,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 8,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 4,
    alignSelf: 'flex-start',
  },
});