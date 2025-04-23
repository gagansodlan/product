import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, ShoppingCart, Star } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { useCartStore } from '@/store/cart-store';
import { Product } from '@/types';
import { getProductById } from '@/mocks/products';

interface ProductCardProps {
  product: Product;
  size?: 'small' | 'medium' | 'large';
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  size = 'medium' 
}) => {
  const router = useRouter();
  const colors = useThemeStore(state => state.colors);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  
  const isWishlisted = isInWishlist(product.id);
  
  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };
  
  const handleWishlistToggle = (e: any) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };
  
  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    const fullProduct = getProductById(product.id);
    if (fullProduct) {
      addItem(fullProduct, 1);
    }
  };
  
  const getCardWidth = () => {
    const screenWidth = Dimensions.get('window').width;
    
    switch (size) {
      case 'small':
        return (screenWidth - 48) / 3; // 3 cards per row with padding
      case 'large':
        return screenWidth - 32; // Full width with padding
      case 'medium':
      default:
        return (screenWidth - 40) / 2; // 2 cards per row with padding
    }
  };
  
  const cardWidth = getCardWidth();
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { 
          width: cardWidth,
          backgroundColor: colors.card,
          borderColor: colors.border
        }
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.images[0].url }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        {product.onSale && (
          <View style={[styles.saleTag, { backgroundColor: colors.secondary }]}>
            <Text style={styles.saleText}>SALE</Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={[styles.wishlistButton, { backgroundColor: colors.background }]}
          onPress={handleWishlistToggle}
        >
          <Heart 
            size={18} 
            color={isWishlisted ? colors.secondary : colors.secondaryText}
            fill={isWishlisted ? colors.secondary : 'none'}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text 
          style={[styles.name, { color: colors.text }]}
          numberOfLines={2}
        >
          {product.name}
        </Text>
        
        {product.averageRating && (
          <View style={styles.ratingContainer}>
            <Star size={14} color={colors.warning} fill={colors.warning} />
            <Text style={[styles.rating, { color: colors.secondaryText }]}>
              {product.averageRating} ({product.reviewCount})
            </Text>
          </View>
        )}
        
        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: colors.text }]}>
            ${product.price.toFixed(2)}
          </Text>
          
          {product.compareAtPrice && (
            <Text style={[styles.comparePrice, { color: colors.secondaryText }]}>
              ${product.compareAtPrice.toFixed(2)}
            </Text>
          )}
        </View>
        
        {size !== 'small' && (
          <TouchableOpacity 
            style={[styles.addToCartButton, { backgroundColor: colors.primary }]}
            onPress={handleAddToCart}
          >
            <ShoppingCart size={16} color="#FFFFFF" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  saleTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  saleText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    height: 40,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 12,
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 6,
  },
  comparePrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});