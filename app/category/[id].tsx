import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter, SlidersHorizontal, Grid, List } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { ProductCard } from '@/components/ui/ProductCard';
import { getProductsByCategory } from '@/mocks/products';
import { categories, getSubcategories } from '@/mocks/categories';
import { Category, Product } from '@/types';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colors = useThemeStore(state => state.colors);
  
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  useEffect(() => {
    loadData();
  }, [id]);
  
  const loadData = () => {
    setIsLoading(true);
    
    // Find the category
    const foundCategory = categories.find(cat => cat.id === id);
    setCategory(foundCategory || null);
    
    // Get subcategories if any
    const foundSubcategories = getSubcategories(id as string);
    setSubcategories(foundSubcategories);
    
    // Get products
    const categoryProducts = getProductsByCategory(id as string);
    
    // Simulate API delay
    setTimeout(() => {
      setProducts(categoryProducts);
      setIsLoading(false);
    }, 500);
  };
  
  const handleSubcategoryPress = (subcategoryId: string) => {
    if (activeSubcategory === subcategoryId) {
      setActiveSubcategory(null);
      // Reset to show all products in the main category
      const categoryProducts = getProductsByCategory(id as string);
      setProducts(categoryProducts);
    } else {
      setActiveSubcategory(subcategoryId);
      // Filter products by subcategory
      const subcategoryProducts = getProductsByCategory(subcategoryId);
      setProducts(subcategoryProducts);
    }
  };
  
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };
  
  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={viewMode === 'grid' ? styles.gridItem : styles.listItem}>
      <ProductCard 
        product={item} 
        size={viewMode === 'grid' ? 'medium' : 'large'} 
      />
    </View>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <Stack.Screen 
        options={{ 
          title: category?.name || "Category",
          headerRight: () => (
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => {}}
            >
              <Filter size={20} color={colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      {subcategories.length > 0 && (
        <View style={styles.subcategoriesContainer}>
          <FlatList
            data={subcategories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={[
                  styles.subcategoryButton,
                  activeSubcategory === item.id && [styles.activeSubcategory, { backgroundColor: colors.primary + '20' }],
                  { borderColor: colors.border }
                ]}
                onPress={() => handleSubcategoryPress(item.id)}
              >
                <Text 
                  style={[
                    styles.subcategoryText,
                    { color: activeSubcategory === item.id ? colors.primary : colors.text }
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.subcategoriesList}
          />
        </View>
      )}
      
      <View style={styles.header}>
        <Text style={[styles.resultsText, { color: colors.secondaryText }]}>
          {products.length} {products.length === 1 ? 'product' : 'products'}
        </Text>
        
        <View style={styles.viewControls}>
          <TouchableOpacity 
            style={[
              styles.viewButton,
              viewMode === 'grid' && [styles.activeViewButton, { backgroundColor: colors.primary + '20' }],
              { borderColor: colors.border }
            ]}
            onPress={() => setViewMode('grid')}
          >
            <Grid 
              size={18} 
              color={viewMode === 'grid' ? colors.primary : colors.secondaryText} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.viewButton,
              viewMode === 'list' && [styles.activeViewButton, { backgroundColor: colors.primary + '20' }],
              { borderColor: colors.border }
            ]}
            onPress={() => setViewMode('list')}
          >
            <List 
              size={18} 
              color={viewMode === 'list' ? colors.primary : colors.secondaryText} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.sortButton, { borderColor: colors.border }]}
            onPress={() => {}}
          >
            <SlidersHorizontal size={18} color={colors.text} />
            <Text style={[styles.sortText, { color: colors.text }]}>Sort</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          {products.length > 0 ? (
            <FlatList
              data={products}
              renderItem={renderProductItem}
              keyExtractor={(item) => item.id}
              numColumns={viewMode === 'grid' ? 2 : 1}
              key={viewMode} // Force re-render when view mode changes
              contentContainerStyle={styles.productsList}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
                No products found in this category
              </Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterButton: {
    padding: 8,
  },
  subcategoriesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  subcategoriesList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  subcategoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  activeSubcategory: {
    borderWidth: 0,
  },
  subcategoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultsText: {
    fontSize: 14,
  },
  viewControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButton: {
    width: 36,
    height: 36,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  activeViewButton: {
    borderWidth: 0,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
  sortText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  productsList: {
    padding: 16,
  },
  gridItem: {
    width: '50%',
    paddingHorizontal: 4,
  },
  listItem: {
    width: '100%',
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});