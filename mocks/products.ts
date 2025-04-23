import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Premium Wireless Headphones',
    slug: 'premium-wireless-headphones',
    description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers and professionals alike.',
    shortDescription: 'Premium wireless headphones with noise cancellation',
    price: 249.99,
    compareAtPrice: 299.99,
    images: [
      {
        id: 'img-1-1',
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        alt: 'Premium Wireless Headphones - Front View'
      },
      {
        id: 'img-1-2',
        url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        alt: 'Premium Wireless Headphones - Side View'
      },
      {
        id: 'img-1-3',
        url: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        alt: 'Premium Wireless Headphones - In Use'
      }
    ],
    categories: ['cat-1', 'subcat-3'],
    tags: ['headphones', 'wireless', 'audio', 'premium'],
    stockQuantity: 45,
    sku: 'HDPH-001-BLK',
    weight: '0.5kg',
    dimensions: {
      length: '18cm',
      width: '15cm',
      height: '8cm'
    },
    attributes: {
      'Color': ['Black', 'Silver', 'Blue'],
      'Connectivity': ['Bluetooth 5.0', 'Wired (3.5mm)'],
      'Battery Life': ['30 hours']
    },
    variants: [
      {
        id: 'var-1-1',
        name: 'Black',
        price: 249.99,
        compareAtPrice: 299.99,
        sku: 'HDPH-001-BLK',
        stockQuantity: 20,
        attributes: {
          'Color': 'Black'
        }
      },
      {
        id: 'var-1-2',
        name: 'Silver',
        price: 249.99,
        compareAtPrice: 299.99,
        sku: 'HDPH-001-SLV',
        stockQuantity: 15,
        attributes: {
          'Color': 'Silver'
        }
      },
      {
        id: 'var-1-3',
        name: 'Blue',
        price: 259.99,
        compareAtPrice: 309.99,
        sku: 'HDPH-001-BLU',
        stockQuantity: 10,
        attributes: {
          'Color': 'Blue'
        }
      }
    ],
    featured: true,
    onSale: true,
    averageRating: 4.7,
    reviewCount: 128,
    reviews: [
      {
        id: 'rev-1-1',
        userId: 'user-1',
        userName: 'Alex Johnson',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 5,
        title: `Best headphones I've ever owned`,
        comment: `The sound quality is incredible, and the noise cancellation works perfectly. Battery life is as advertised, and they're very comfortable for long listening sessions.`,
        date: '2023-05-15',
        helpful: 24
      },
      {
        id: 'rev-1-2',
        userId: 'user-2',
        userName: 'Sarah Miller',
        rating: 4,
        comment: `Great sound and comfortable fit. The only downside is they're a bit bulky for travel, but the carrying case helps.`,
        date: '2023-04-22',
        helpful: 10
      }
    ],
    relatedProducts: ['prod-3', 'prod-7']
  },
  {
    id: 'prod-2',
    name: 'Smart Fitness Watch',
    slug: 'smart-fitness-watch',
    description: 'Track your fitness goals with our advanced Smart Fitness Watch. Features include heart rate monitoring, sleep tracking, GPS, water resistance up to 50m, and compatibility with iOS and Android. The perfect companion for your active lifestyle.',
    shortDescription: 'Advanced fitness tracker with heart rate monitor',
    price: 179.99,
    compareAtPrice: 199.99,
    images: [
      {
        id: 'img-2-1',
        url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        alt: 'Smart Fitness Watch - Front View'
      },
      {
        id: 'img-2-2',
        url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        alt: 'Smart Fitness Watch - On Wrist'
      }
    ],
    categories: ['cat-1', 'cat-5'],
    tags: ['fitness', 'smartwatch', 'wearable', 'health'],
    stockQuantity: 30,
    sku: 'FTWS-002-BLK',
    weight: '0.05kg',
    attributes: {
      'Color': ['Black', 'White', 'Blue'],
      'Band Material': ['Silicone', 'Nylon'],
      'Water Resistance': ['50m']
    },
    variants: [
      {
        id: 'var-2-1',
        name: 'Black - Silicone',
        price: 179.99,
        compareAtPrice: 199.99,
        sku: 'FTWS-002-BLK-SIL',
        stockQuantity: 12,
        attributes: {
          'Color': 'Black',
          'Band Material': 'Silicone'
        }
      },
      {
        id: 'var-2-2',
        name: 'White - Silicone',
        price: 179.99,
        compareAtPrice: 199.99,
        sku: 'FTWS-002-WHT-SIL',
        stockQuantity: 8,
        attributes: {
          'Color': 'White',
          'Band Material': 'Silicone'
        }
      },
      {
        id: 'var-2-3',
        name: 'Blue - Nylon',
        price: 189.99,
        compareAtPrice: 209.99,
        sku: 'FTWS-002-BLU-NYL',
        stockQuantity: 10,
        attributes: {
          'Color': 'Blue',
          'Band Material': 'Nylon'
        }
      }
    ],
    featured: true,
    onSale: true,
    averageRating: 4.5,
    reviewCount: 86,
    reviews: [
      {
        id: 'rev-2-1',
        userId: 'user-3',
        userName: 'Michael Chen',
        rating: 5,
        comment: 'This watch has transformed my fitness routine. The heart rate monitor is accurate, and the sleep tracking has helped me improve my rest. Highly recommend!',
        date: '2023-06-02',
        helpful: 15
      },
      {
        id: 'rev-2-2',
        userId: 'user-4',
        userName: 'Jessica Williams',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4,
        title: 'Great features, battery could be better',
        comment: 'I love all the tracking features and the app is intuitive. The only downside is that with GPS enabled, the battery drains pretty quickly.',
        date: '2023-05-18',
        helpful: 8
      }
    ],
    relatedProducts: ['prod-5', 'prod-8']
  },
  {
    id: 'prod-3',
    name: 'Wireless Earbuds',
    slug: 'wireless-earbuds',
    description: 'Compact and powerful wireless earbuds with crystal clear sound. Features include active noise cancellation, water resistance, touch controls, and up to 24 hours of battery life with the charging case.',
    shortDescription: 'Compact wireless earbuds with noise cancellation',
    price: 129.99,
    compareAtPrice: 149.99,
    images: [
      {
        id: 'img-3-1',
        url: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        alt: 'Wireless Earbuds - With Case'
      },
      {
        id: 'img-3-2',
        url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        alt: 'Wireless Earbuds - Close Up'
      }
    ],
    categories: ['cat-1', 'subcat-3'],
    tags: ['earbuds', 'wireless', 'audio'],
    stockQuantity: 50,
    sku: 'WREB-003-WHT',
    featured: false,
    onSale: true,
    averageRating: 4.3,
    reviewCount: 64,
    reviews: [
      {
        id: 'rev-3-1',
        userId: 'user-5',
        userName: 'David Thompson',
        rating: 4,
        comment: 'Great sound quality and comfortable fit. Battery life is good, but the touch controls can be a bit finicky.',
        date: '2023-04-10',
        helpful: 6
      }
    ],
    relatedProducts: ['prod-1', 'prod-7']
  },
  {
    id: 'prod-4',
    name: 'Men\'s Casual Jacket',
    slug: 'mens-casual-jacket',
    description: 'Stylish and comfortable men\'s casual jacket perfect for fall and spring. Made with high-quality water-resistant material, featuring multiple pockets and a modern fit.',
    shortDescription: 'Stylish water-resistant men\'s jacket',
    price: 89.99,
    compareAtPrice: 119.99,
    images: [
      {
        id: 'img-4-1',
        url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        alt: 'Men\'s Casual Jacket - Front View'
      },
      {
        id: 'img-4-2',
        url: 'https://images.unsplash.com/photo-1608063615781-e2ef8c73d114?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        alt: 'Men\'s Casual Jacket - Back View'
      }
    ],
    categories: ['cat-2', 'subcat-4'],
    tags: ['men', 'jacket', 'casual', 'outerwear'],
    stockQuantity: 25,
    sku: 'MNJK-004-NVY',
    attributes: {
      'Color': ['Navy', 'Black', 'Olive'],
      'Size': ['S', 'M', 'L', 'XL', 'XXL']
    },
    variants: [
      {
        id: 'var-4-1',
        name: 'Navy - M',
        price: 89.99,
        compareAtPrice: 119.99,
        sku: 'MNJK-004-NVY-M',
        stockQuantity: 5,
        attributes: {
          'Color': 'Navy',
          'Size': 'M'
        }
      },
      {
        id: 'var-4-2',
        name: 'Black - L',
        price: 89.99,
        compareAtPrice: 119.99,
        sku: 'MNJK-004-BLK-L',
        stockQuantity: 8,
        attributes: {
          'Color': 'Black',
          'Size': 'L'
        }
      }
    ],
    featured: false,
    onSale: true,
    averageRating: 4.6,
    reviewCount: 42,
    relatedProducts: ['prod-9', 'prod-10']
  },
  {
    id: 'prod-5',
    name: 'Smart Home Speaker',
    slug: 'smart-home-speaker',
    description: 'Transform your home with our Smart Home Speaker. Control your smart devices, play music, get weather updates, and more with simple voice commands. Features premium sound quality and sleek design.',
    shortDescription: 'Voice-controlled smart speaker for your home',
    price: 99.99,
    compareAtPrice: 129.99,
    images: [
      {
        id: 'img-5-1',
        url: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        alt: 'Smart Home Speaker'
      }
    ],
    categories: ['cat-1', 'cat-3'],
    tags: ['smart home', 'speaker', 'voice assistant'],
    stockQuantity: 35,
    sku: 'SMSP-005-GRY',
    featured: true,
    onSale: false,
    averageRating: 4.4,
    reviewCount: 78,
    relatedProducts: ['prod-1', 'prod-3']
  },
  {
    id: 'prod-6',
    name: 'Professional DSLR Camera',
    slug: 'professional-dslr-camera',
    description: 'Capture stunning photos and videos with our Professional DSLR Camera. Features a 24.2MP sensor, 4K video recording, 45-point autofocus system, and compatibility with a wide range of lenses.',
    shortDescription: 'High-performance DSLR for photography enthusiasts',
    price: 1299.99,
    compareAtPrice: 1499.99,
    images: [
      {
        id: 'img-6-1',
        url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        alt: 'Professional DSLR Camera'
      }
    ],
    categories: ['cat-1'],
    tags: ['camera', 'photography', 'professional', 'DSLR'],
    stockQuantity: 10,
    sku: 'DSLR-006-BLK',
    featured: true,
    onSale: true,
    averageRating: 4.9,
    reviewCount: 36,
    relatedProducts: ['prod-11', 'prod-12']
  },
  {
    id: 'prod-7',
    name: 'Portable Bluetooth Speaker',
    slug: 'portable-bluetooth-speaker',
    description: 'Take your music anywhere with our Portable Bluetooth Speaker. Features include 20 hours of battery life, waterproof design, rich bass, and the ability to connect multiple speakers for stereo sound.',
    shortDescription: 'Waterproof portable speaker with long battery life',
    price: 79.99,
    compareAtPrice: 99.99,
    images: [
      {
        id: 'img-7-1',
        url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        alt: 'Portable Bluetooth Speaker'
      }
    ],
    categories: ['cat-1', 'subcat-3'],
    tags: ['speaker', 'bluetooth', 'portable', 'waterproof'],
    stockQuantity: 40,
    sku: 'BTSP-007-BLU',
    featured: false,
    onSale: true,
    averageRating: 4.5,
    reviewCount: 92,
    relatedProducts: ['prod-3', 'prod-5']
  },
  {
    id: 'prod-8',
    name: 'Women\'s Running Shoes',
    slug: 'womens-running-shoes',
    description: 'Engineered for performance and comfort, our Women\'s Running Shoes feature responsive cushioning, breathable mesh upper, and durable rubber outsole. Perfect for daily runs and training.',
    shortDescription: 'Performance running shoes for women',
    price: 119.99,
    compareAtPrice: 139.99,
    images: [
      {
        id: 'img-8-1',
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        alt: 'Women\'s Running Shoes'
      }
    ],
    categories: ['cat-2', 'subcat-5', 'cat-5'],
    tags: ['women', 'shoes', 'running', 'athletic'],
    stockQuantity: 30,
    sku: 'WRSH-008-PNK',
    attributes: {
      'Color': ['Pink', 'Black', 'Blue'],
      'Size': ['6', '7', '8', '9', '10']
    },
    featured: false,
    onSale: true,
    averageRating: 4.7,
    reviewCount: 58,
    relatedProducts: ['prod-2', 'prod-13']
  },
  {
    id: 'prod-9',
    name: 'Stainless Steel Cookware Set',
    slug: 'stainless-steel-cookware-set',
    description: 'Upgrade your kitchen with our premium 10-piece Stainless Steel Cookware Set. Includes pots and pans of various sizes, all featuring tri-ply construction for even heat distribution and durability.',
    shortDescription: 'Premium 10-piece stainless steel cookware set',
    price: 249.99,
    compareAtPrice: 299.99,
    images: [
      {
        id: 'img-9-1',
        url: 'https://images.unsplash.com/photo-1584990347449-a5d2d1a1dbf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        alt: 'Stainless Steel Cookware Set'
      }
    ],
    categories: ['cat-3', 'subcat-7'],
    tags: ['kitchen', 'cookware', 'stainless steel'],
    stockQuantity: 15,
    sku: 'COOK-009-SS',
    featured: false,
    onSale: false,
    averageRating: 4.8,
    reviewCount: 45,
    relatedProducts: ['prod-14', 'prod-15']
  },
  {
    id: 'prod-10',
    name: 'Men\'s Slim Fit Dress Shirt',
    slug: 'mens-slim-fit-dress-shirt',
    description: 'Classic yet modern men\'s dress shirt with a slim fit design. Made from high-quality cotton blend fabric that\'s wrinkle-resistant and comfortable for all-day wear.',
    shortDescription: 'Classic slim fit dress shirt for men',
    price: 49.99,
    compareAtPrice: 59.99,
    images: [
      {
        id: 'img-10-1',
        url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        alt: 'Men\'s Slim Fit Dress Shirt'
      }
    ],
    categories: ['cat-2', 'subcat-4'],
    tags: ['men', 'shirt', 'dress', 'formal'],
    stockQuantity: 50,
    sku: 'MSHT-010-WHT',
    attributes: {
      'Color': ['White', 'Blue', 'Black'],
      'Size': ['S', 'M', 'L', 'XL', 'XXL'],
      'Collar': ['Regular', 'Button-down']
    },
    featured: false,
    onSale: false,
    averageRating: 4.5,
    reviewCount: 72,
    relatedProducts: ['prod-4', 'prod-16']
  }
];

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getOnSaleProducts = () => {
  return products.filter(product => product.onSale);
};

export const getProductsByCategory = (categoryId: string) => {
  return products.filter(product => product.categories.includes(categoryId));
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (productId: string) => {
  const product = getProductById(productId);
  if (!product || !product.relatedProducts) return [];
  
  return products.filter(p => product.relatedProducts?.includes(p.id));
};

export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery) ||
    (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
  );
};