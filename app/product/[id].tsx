import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Dimensions,
  Alert
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  ChevronRight, 
  Truck, 
  RotateCcw, 
  Shield, 
  Minus, 
  Plus 
} from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/ui/ProductCard';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { getProductById, getRelatedProducts } from '@/mocks/products';
import { Product, ProductVariant } from '@/types';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colors = useThemeStore(state => state.colors);
  const { addItem } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  
  const product = getProductById(id as string);
  const relatedProducts = getRelatedProducts(id as string);
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product?.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [expandDescription, setExpandDescription] = useState(false);
  
  const isWishlisted = isInWishlist(product?.id || '');
  
  useEffect(() => {
    if (!product) {
      Alert.alert("Error", "Product not found");
      router.back();
    }
  }, [product]);
  
  if (!product) return null;
  
  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };
  
  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant?.id);
    Alert.alert(
      "Added to Cart",
      `${product.name} has been added to your cart.`,
      [
        {
          text: "Continue Shopping",
          style: "cancel"
        },
        { 
          text: "View Cart", 
          onPress: () => router.push('/cart')
        }
      ]
    );
  };
  
  const handleBuyNow = () => {
    addItem(product, quantity, selectedVariant?.id);
    router.push('/checkout');
  };
  
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant);
  };
  
  const handleViewAllReviews = () => {
    // In a real app, this would navigate to a reviews screen
    Alert.alert("Reviews", "View all reviews functionality would be implemented here");
  };
  
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const comparePrice = selectedVariant ? selectedVariant.compareAtPrice : product.compareAtPrice;
  const stockQuantity = selectedVariant ? selectedVariant.stockQuantity : product.stockQuantity;
  const discount = comparePrice ? Math.round(((comparePrice - currentPrice) / comparePrice) * 100) : 0;
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
              setActiveImageIndex(newIndex);
            }}
          >
            {product.images.map((image, index) => (
              <Image
                key={image.id}
                source={{ uri: image.url }}
                style={styles.productImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          
          {/* Image Pagination */}
          <View style={styles.pagination}>
            {product.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === activeImageIndex && [styles.activeDot, { backgroundColor: colors.primary }],
                  { backgroundColor: index === activeImageIndex ? colors.primary : colors.border }
                ]}
              />
            ))}
          </View>
          
          {/* Wishlist Button */}
          <TouchableOpacity 
            style={[styles.wishlistButton, { backgroundColor: colors.background }]}
            onPress={handleWishlistToggle}
          >
            <Heart 
              size={20} 
              color={isWishlisted ? colors.secondary : colors.text}
              fill={isWishlisted ? colors.secondary : 'none'}
            />
          </TouchableOpacity>
        </View>
        
        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={[styles.productName, { color: colors.text }]}>
            {product.name}
          </Text>
          
          {product.averageRating && (
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    size={16}
                    color={colors.warning}
                    fill={star <= Math.round(product.averageRating) ? colors.warning : 'none'}
                  />
                ))}
              </View>
              <Text style={[styles.ratingText, { color: colors.secondaryText }]}>
                {product.averageRating} ({product.reviewCount} reviews)
              </Text>
            </View>
          )}
          
          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: colors.text }]}>
              ${currentPrice.toFixed(2)}
            </Text>
            
            {comparePrice && (
              <>
                <Text style={[styles.comparePrice, { color: colors.secondaryText }]}>
                  ${comparePrice.toFixed(2)}
                </Text>
                <View style={[styles.discountBadge, { backgroundColor: colors.secondary + '20' }]}>
                  <Text style={[styles.discountText, { color: colors.secondary }]}>
                    {discount}% OFF
                  </Text>
                </View>
              </>
            )}
          </View>
          
          {/* Stock Status */}
          <Text 
            style={[
              styles.stockStatus, 
              { 
                color: stockQuantity > 0 ? colors.success : colors.error 
              }
            ]}
          >
            {stockQuantity > 0 
              ? stockQuantity > 10 
                ? 'In Stock' 
                : `Only ${stockQuantity} left in stock` 
              : 'Out of Stock'}
          </Text>
        </View>
        
        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <View style={[styles.section, { borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {Object.keys(product.variants[0].attributes)[0]}
            </Text>
            
            <View style={styles.variantsContainer}>
              {product.variants.map((variant) => (
                <TouchableOpacity
                  key={variant.id}
                  style={[
                    styles.variantButton,
                    selectedVariant?.id === variant.id && [styles.selectedVariant, { borderColor: colors.primary }],
                    { borderColor: colors.border }
                  ]}
                  onPress={() => handleVariantSelect(variant)}
                >
                  <Text 
                    style={[
                      styles.variantText, 
                      { 
                        color: selectedVariant?.id === variant.id ? colors.primary : colors.text 
                      }
                    ]}
                  >
                    {Object.values(variant.attributes)[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        
        {/* Quantity */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Quantity
          </Text>
          
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={[styles.quantityButton, { borderColor: colors.border }]}
              onPress={handleDecreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus size={16} color={quantity <= 1 ? colors.secondaryText : colors.text} />
            </TouchableOpacity>
            
            <Text style={[styles.quantityText, { color: colors.text }]}>
              {quantity}
            </Text>
            
            <TouchableOpacity 
              style={[styles.quantityButton, { borderColor: colors.border }]}
              onPress={handleIncreaseQuantity}
              disabled={quantity >= stockQuantity}
            >
              <Plus size={16} color={quantity >= stockQuantity ? colors.secondaryText : colors.text} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Description */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Description
          </Text>
          
          <Text 
            style={[
              styles.description, 
              { color: colors.text },
              !expandDescription && styles.collapsedDescription
            ]}
            numberOfLines={expandDescription ? undefined : 3}
          >
            {product.description}
          </Text>
          
          {product.description.length > 150 && (
            <TouchableOpacity 
              style={styles.expandButton}
              onPress={() => setExpandDescription(!expandDescription)}
            >
              <Text style={[styles.expandButtonText, { color: colors.primary }]}>
                {expandDescription ? 'Show Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        {/* Shipping & Returns */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Shipping & Returns
          </Text>
          
          <View style={styles.shippingItem}>
            <Truck size={18} color={colors.text} style={styles.shippingIcon} />
            <View>
              <Text style={[styles.shippingTitle, { color: colors.text }]}>
                Free Shipping
              </Text>
              <Text style={[styles.shippingText, { color: colors.secondaryText }]}>
                On orders over $100
              </Text>
            </View>
          </View>
          
          <View style={styles.shippingItem}>
            <RotateCcw size={18} color={colors.text} style={styles.shippingIcon} />
            <View>
              <Text style={[styles.shippingTitle, { color: colors.text }]}>
                Easy Returns
              </Text>
              <Text style={[styles.shippingText, { color: colors.secondaryText }]}>
                30 day return policy
              </Text>
            </View>
          </View>
          
          <View style={styles.shippingItem}>
            <Shield size={18} color={colors.text} style={styles.shippingIcon} />
            <View>
              <Text style={[styles.shippingTitle, { color: colors.text }]}>
                Secure Checkout
              </Text>
              <Text style={[styles.shippingText, { color: colors.secondaryText }]}>
                SSL encrypted checkout
              </Text>
            </View>
          </View>
        </View>
        
        {/* Reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <View style={[styles.section, { borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Reviews
              </Text>
              
              <TouchableOpacity 
                style={styles.viewAllButton}
                onPress={handleViewAllReviews}
              >
                <Text style={[styles.viewAllText, { color: colors.primary }]}>
                  View All
                </Text>
                <ChevronRight size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
            
            {product.reviews.slice(0, 2).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </View>
        )}
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 16 }]}>
              You May Also Like
            </Text>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedProductsContainer}
            >
              {relatedProducts.map((relatedProduct) => (
                <View key={relatedProduct.id} style={{ width: width * 0.6, marginRight: 12 }}>
                  <ProductCard product={relatedProduct} size="large" />
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
      
      {/* Bottom Action Bar */}
      <View style={[styles.actionBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Button
          title="Add to Cart"
          variant="outline"
          leftIcon={<ShoppingCart size={18} color={colors.primary} />}
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          disabled={stockQuantity <= 0}
        />
        
        <Button
          title="Buy Now"
          leftIcon={<ShoppingCart size={18} color="#FFFFFF" />}
          style={styles.buyNowButton}
          onPress={handleBuyNow}
          disabled={stockQuantity <= 0}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: width,
  },
  productImage: {
    width,
    height: width,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 12,
    height: 8,
  },
  wishlistButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoContainer: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  comparePrice: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  stockStatus: {
    fontSize: 14,
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
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  variantsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  variantButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedVariant: {
    borderWidth: 2,
  },
  variantText: {
    fontSize: 14,
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 16,
    minWidth: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
  },
  collapsedDescription: {
    marginBottom: 8,
  },
  expandButton: {
    alignSelf: 'flex-start',
  },
  expandButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  shippingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  shippingIcon: {
    marginRight: 12,
  },
  shippingTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  shippingText: {
    fontSize: 12,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  relatedProductsContainer: {
    paddingRight: 16,
  },
  actionBar: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
  },
  addToCartButton: {
    flex: 1,
    marginRight: 8,
  },
  buyNowButton: {
    flex: 1,
    marginLeft: 8,
  },
});