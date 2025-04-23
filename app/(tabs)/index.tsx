import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl,
  Image,
  useWindowDimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, ChevronRight } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { ProductCard } from '@/components/ui/ProductCard';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { getFeaturedCategories, categories } from '@/mocks/categories';
import { getFeaturedProducts, getOnSaleProducts } from '@/mocks/products';

export default function HomeScreen() {
  const router = useRouter();
  const colors = useThemeStore(state => state.colors);
  const { width } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);
  
  const featuredCategories = getFeaturedCategories();
  const featuredProducts = getFeaturedProducts();
  const onSaleProducts = getOnSaleProducts();
  
  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };
  
  const handleSearchPress = () => {
    router.push('/search');
  };
  
  const handleSeeAllCategories = () => {
    router.push('/search?tab=categories');
  };
  
  const handleSeeAllFeatured = () => {
    router.push('/search?filter=featured');
  };
  
  const handleSeeAllOnSale = () => {
    router.push('/search?filter=sale');
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.welcomeText, { color: colors.secondaryText }]}>
              Welcome to
            </Text>
            <Text style={[styles.storeName, { color: colors.text }]}>
              ShopHub
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.searchButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={handleSearchPress}
          >
            <Search size={20} color={colors.secondaryText} />
            <Text style={[styles.searchText, { color: colors.secondaryText }]}>
              Search products...
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Hero Banner */}
        <TouchableOpacity 
          style={styles.heroBanner}
          onPress={() => router.push('/search?filter=sale')}
          activeOpacity={0.9}
        >
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' }}
            style={styles.heroBannerImage}
            resizeMode="cover"
          />
          <View style={styles.heroBannerOverlay}>
            <Text style={styles.heroBannerTitle}>Summer Sale</Text>
            <Text style={styles.heroBannerSubtitle}>Up to 50% off</Text>
            <View style={[styles.heroBannerButton, { backgroundColor: colors.primary }]}>
              <Text style={styles.heroBannerButtonText}>Shop Now</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Categories
            </Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={handleSeeAllCategories}
            >
              <Text style={[styles.seeAllText, { color: colors.primary }]}>
                See All
              </Text>
              <ChevronRight size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {featuredCategories.map((category) => (
              <View key={category.id} style={{ width: width * 0.4, marginRight: 12 }}>
                <CategoryCard category={category} size="medium" />
              </View>
            ))}
          </ScrollView>
        </View>
        
        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Featured Products
            </Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={handleSeeAllFeatured}
            >
              <Text style={[styles.seeAllText, { color: colors.primary }]}>
                See All
              </Text>
              <ChevronRight size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsContainer}
          >
            {featuredProducts.map((product) => (
              <View key={product.id} style={{ width: width * 0.6, marginRight: 12 }}>
                <ProductCard product={product} size="large" />
              </View>
            ))}
          </ScrollView>
        </View>
        
        {/* On Sale Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              On Sale
            </Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={handleSeeAllOnSale}
            >
              <Text style={[styles.seeAllText, { color: colors.primary }]}>
                See All
              </Text>
              <ChevronRight size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.gridContainer}>
            {onSaleProducts.slice(0, 4).map((product) => (
              <View key={product.id} style={styles.gridItem}>
                <ProductCard product={product} size="medium" />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  welcomeText: {
    fontSize: 14,
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  searchText: {
    marginLeft: 8,
    fontSize: 14,
  },
  heroBanner: {
    height: 200,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  heroBannerImage: {
    width: '100%',
    height: '100%',
  },
  heroBannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  heroBannerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroBannerSubtitle: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 16,
  },
  heroBannerButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  heroBannerButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  productsContainer: {
    paddingHorizontal: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  gridItem: {
    width: '48%',
  },
});