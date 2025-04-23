import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search as SearchIcon, X, Filter } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { ProductCard } from '@/components/ui/ProductCard';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { products, searchProducts, getFeaturedProducts, getOnSaleProducts } from '@/mocks/products';
import { categories, getAllCategories } from '@/mocks/categories';

export default function SearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colors = useThemeStore(state => state.colors);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>(
    params.tab === 'categories' ? 'categories' : 'products'
  );
  const [filter, setFilter] = useState<'all' | 'featured' | 'sale'>(
    params.filter === 'featured' ? 'featured' : 
    params.filter === 'sale' ? 'sale' : 'all'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(products);
  const [categoryResults, setCategoryResults] = useState(categories);
  
  useEffect(() => {
    if (params.query) setSearchQuery(params.query as string);
    if (params.filter) setFilter(params.filter as 'all' | 'featured' | 'sale');
    if (params.tab) setActiveTab(params.tab as 'products' | 'categories');
  }, [params]);
  
  useEffect(() => {
    handleSearch();
  }, [searchQuery, filter, activeTab]);
  
  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (activeTab === 'products') {
        let results = searchQuery.trim() ? searchProducts(searchQuery) : products;
        if (filter === 'featured') results = results.filter(p => p.featured);
        else if (filter === 'sale') results = results.filter(p => p.onSale);
        setSearchResults(results);
      } else {
        const allCategories = getAllCategories();
        const results = searchQuery.trim()
          ? allCategories.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
          : categories;
        setCategoryResults(results);
      }
      setIsLoading(false);
    }, 500);
  };
  
  const handleClearSearch = () => setSearchQuery('');
  
  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <ProductCard product={item} />
    </View>
  );

  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryItem}>
      <CategoryCard category={item} size="large" />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <SearchIcon size={20} color={colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search products..."
            placeholderTextColor={colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
            autoFocus={params.query ? true : false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
              <X size={20} color={colors.secondaryText} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Filter size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        {['products', 'categories'].map((tab) => (
          <TouchableOpacity 
            key={tab}
            style={[styles.tab, activeTab === tab && [styles.activeTab, { borderColor: colors.primary }]]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, { color: activeTab === tab ? colors.primary : colors.secondaryText }]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'products' && (
        <View style={styles.filters}>
          {['all', 'featured', 'sale'].map((item) => (
            <TouchableOpacity 
              key={item}
              style={[styles.filterChip, filter === item && [styles.activeFilterChip, { backgroundColor: colors.primary + '20' }]]}
              onPress={() => setFilter(item)}
            >
              <Text style={[styles.filterChipText, { color: filter === item ? colors.primary : colors.secondaryText }]}>
                {item === 'all' ? 'All' : item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={activeTab === 'products' ? searchResults : categoryResults}
          renderItem={activeTab === 'products' ? renderProductItem : renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={activeTab === 'products' ? 2 : 1}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          initialNumToRender={8}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  searchContainer: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    padding: 10, borderRadius: 8, borderWidth: 1,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16 },
  filterButton: {
    width: 44, height: 44, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
    marginLeft: 12, borderWidth: 1,
  },
  tabs: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16 },
  tab: { paddingVertical: 8, paddingHorizontal: 16, marginRight: 16 },
  activeTab: { borderBottomWidth: 2 },
  tabText: { fontSize: 16, fontWeight: '500' },
  filters: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16 },
  filterChip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, marginRight: 8 },
  activeFilterChip: { borderWidth: 0 },
  filterChipText: { fontSize: 14, fontWeight: '500' },
  listContent: { padding: 16 },
  productItem: { width: '50%', paddingHorizontal: 4 },
  categoryItem: { marginBottom: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});