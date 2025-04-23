import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';

export default function WishlistScreen() {
  const router = useRouter();
  const colors = useThemeStore(state => state.colors);
  const { getWishlistProducts, clearWishlist } = useWishlistStore();
  
  const wishlistProducts = getWishlistProducts();
  
  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <ProductCard product={item} />
    </View>
  );
  
  if (wishlistProducts.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.emptyContainer}>
          <Heart size={64} color={colors.secondaryText} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Your wishlist is empty
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.secondaryText }]}>
            Save your favorite items to come back to them later.
          </Text>
          <Button
            title="Discover Products"
            onPress={() => router.push('/')}
            style={styles.discoverButton}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          My Wishlist ({wishlistProducts.length})
        </Text>
        {wishlistProducts.length > 0 && (
          <Text 
            style={[styles.clearText, { color: colors.error }]}
            onPress={clearWishlist}
          >
            Clear All
          </Text>
        )}
      </View>
      
      <FlatList
        data={wishlistProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
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
  listContent: {
    padding: 16,
  },
  productItem: {
    width: '50%',
    paddingHorizontal: 4,
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
  discoverButton: {
    width: '80%',
  },
});