import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Latest gadgets and electronic devices',
    featured: true
  },
  {
    id: 'cat-2',
    name: 'Clothing',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Trendy fashion for all seasons',
    featured: true
  },
  {
    id: 'cat-3',
    name: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Everything for your home',
    featured: true
  },
  {
    id: 'cat-4',
    name: 'Beauty & Personal Care',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Skincare, makeup, and personal care products'
  },
  {
    id: 'cat-5',
    name: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Equipment for all your sporting needs'
  },
  {
    id: 'cat-6',
    name: 'Books',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Bestsellers, fiction, non-fiction and more'
  },
  {
    id: 'cat-7',
    name: 'Toys & Games',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Fun for all ages'
  },
  {
    id: 'cat-8',
    name: 'Furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Modern and classic furniture for every room'
  }
];

// Sub-categories
export const subCategories: Category[] = [
  // Electronics sub-categories
  {
    id: 'subcat-1',
    name: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    parentId: 'cat-1'
  },
  {
    id: 'subcat-2',
    name: 'Laptops',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    parentId: 'cat-1'
  },
  {
    id: 'subcat-3',
    name: 'Audio',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    parentId: 'cat-1'
  },
  
  // Clothing sub-categories
  {
    id: 'subcat-4',
    name: "Men's Clothing",
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    parentId: 'cat-2'
  },
  {
    id: 'subcat-5',
    name: "Women's Clothing",
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    parentId: 'cat-2'
  },
  {
    id: 'subcat-6',
    name: "Kid's Clothing",
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    parentId: 'cat-2'
  },
  
  // Home & Kitchen sub-categories
  {
    id: 'subcat-7',
    name: 'Kitchen Appliances',
    image: 'https://images.unsplash.com/photo-1556909114-44e3e9699e2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    parentId: 'cat-3'
  },
  {
    id: 'subcat-8',
    name: 'Bedding',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    parentId: 'cat-3'
  }
];

export const getAllCategories = () => {
  return [...categories, ...subCategories];
};

export const getFeaturedCategories = () => {
  return categories.filter(category => category.featured);
};

export const getSubcategories = (parentId: string) => {
  return subCategories.filter(category => category.parentId === parentId);
};