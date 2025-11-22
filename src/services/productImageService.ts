/**
 * Product Image Service
 * Maps product categories to high-quality Unsplash images
 */

interface ImageMapping {
  [key: string]: string;
}

// High-quality Unsplash images for each produce category
const CATEGORY_IMAGES: ImageMapping = {
  // Fruits
  'Apples': 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80', // Red apples
  'Avocados': 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80', // Fresh avocados
  'Bananas': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&q=80', // Bunch of bananas
  'Grapes': 'https://images.unsplash.com/photo-1601275371020-0c8e7331f9d2?w=800&q=80', // Purple grapes
  'Kiwi': 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=800&q=80', // Sliced kiwi
  'Mango': 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=80', // Fresh mangos
  'Tropical Fruits': 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&q=80', // Mixed tropical fruits
  'Exotic Fruits': 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&q=80', // Exotic fruits

  // Citrus
  'Citrus': 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&q=80', // Mixed citrus

  // Melons
  'Melons': 'https://images.unsplash.com/photo-1621583832264-e72a0e44f498?w=800&q=80', // Watermelon slices

  // Vegetables - Leafy
  'Lettuce': 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&q=80', // Fresh lettuce
  'Cabbage': 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=800&q=80', // Green cabbage
  'Celery': 'https://images.unsplash.com/photo-1625536183117-b65cdb281f59?w=800&q=80', // Celery stalks
  'Herbs': 'https://images.unsplash.com/photo-1509963159-185af8f60f05?w=800&q=80', // Fresh herbs

  // Root Vegetables
  'Carrots': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80', // Orange carrots
  'Beets': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80', // Fresh beets
  'Root Vegetables': 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=800&q=80', // Mixed root vegetables
  'Ginger': 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=80', // Ginger root
  'Garlic': 'https://images.unsplash.com/photo-1599003160627-f8e58a2867e5?w=800&q=80', // Garlic bulbs

  // Peppers & Spicy
  'Peppers': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&q=80', // Bell peppers

  // Other Vegetables
  'Tomatoes': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80', // Vine tomatoes
  'Cucumbers': 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=800&q=80', // Cucumbers
  'Eggplant': 'https://images.unsplash.com/photo-1603113797551-c2a16c128b01?w=800&q=80', // Purple eggplant
  'Squash': 'https://images.unsplash.com/photo-1570301099009-9b56f2e3d8b0?w=800&q=80', // Squash varieties
  'Corn': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80', // Corn on cob
  'Mushrooms': 'https://images.unsplash.com/photo-1580013759032-c96505e24c1f?w=800&q=80', // Fresh mushrooms

  // Onions
  'Onions': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&q=80', // Mixed onions

  // Specialty
  'Coconut': 'https://images.unsplash.com/photo-1589606743769-2e4f0a0c9e0e?w=800&q=80', // Coconuts
  'Nopales': 'https://images.unsplash.com/photo-1626525849322-7c58c55f989b?w=800&q=80', // Nopales (cactus)

  // Tortillas & Bread
  'Mission/Guerrero': 'https://images.unsplash.com/photo-1566527802736-83f8bda2f5cf?w=800&q=80', // Tortillas
  'La Rancherita': 'https://images.unsplash.com/photo-1566527802736-83f8bda2f5cf?w=800&q=80', // Tortillas
  'El Mexicano': 'https://images.unsplash.com/photo-1566527802736-83f8bda2f5cf?w=800&q=80', // Tortillas
  'Azteca Foods': 'https://images.unsplash.com/photo-1566527802736-83f8bda2f5cf?w=800&q=80', // Tortillas

  // Default fallback
  'default': 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&q=80', // Mixed produce
};

// Special mappings for specific product names
const PRODUCT_NAME_OVERRIDES: Record<string, string> = {
  // Tomatoes
  'Tomato': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80',
  'Roma Tomato': 'https://images.unsplash.com/photo-1546470427-e26264823baa?w=800&q=80',
  'Cherry Tomato': 'https://images.unsplash.com/photo-1574652213019-8a4beefb2d89?w=800&q=80',

  // Berries
  'Strawberr': 'https://images.unsplash.com/photo-1543528176-61b239494933?w=800&q=80',
  'Blueberr': 'https://images.unsplash.com/photo-1596543225162-27748609fffb?w=800&q=80',
  'Raspberry': 'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=800&q=80',
  'Blackberr': 'https://images.unsplash.com/photo-1598032896435-79482c27b7c5?w=800&q=80',

  // Leafy greens
  'Spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=80',
  'Kale': 'https://images.unsplash.com/photo-1541414779316-956a5084c0d4?w=800&q=80',
  'Arugula': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80',

  // Specific items
  'Watermelon': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80',
  'Pineapple': 'https://images.unsplash.com/photo-1550828483-bb5f92f6e561?w=800&q=80',
  'Potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80',
  'Sweet Potato': 'https://images.unsplash.com/photo-1556617708-fb0bd1beaa12?w=800&q=80',
  'Broccoli': 'https://images.unsplash.com/photo-1628773822990-202c20f9e27b?w=800&q=80',
  'Cauliflower': 'https://images.unsplash.com/photo-1568584711636-fdbc71d48ce0?w=800&q=80',
  'Asparagus': 'https://images.unsplash.com/photo-1589927986089-35812388d1b8?w=800&q=80',
  'Green Bean': 'https://images.unsplash.com/photo-1599399431846-f8c22c8d8574?w=800&q=80',
  'Pea': 'https://images.unsplash.com/photo-1558998993-664b78a01c86?w=800&q=80',
  'Zucchini': 'https://images.unsplash.com/photo-1598004432133-a8aa96ccab02?w=800&q=80',
};

/**
 * Get image URL for a product based on its subcategory or name
 */
export function getProductImage(productName: string, subcategory?: string): string {
  // Check for specific product name matches first
  for (const [keyword, imageUrl] of Object.entries(PRODUCT_NAME_OVERRIDES)) {
    if (productName.toLowerCase().includes(keyword.toLowerCase())) {
      return imageUrl;
    }
  }

  // Fall back to subcategory
  if (subcategory && CATEGORY_IMAGES[subcategory]) {
    return CATEGORY_IMAGES[subcategory];
  }

  // Default fallback
  return CATEGORY_IMAGES['default'];
}

/**
 * Get all products with images added
 */
export function addImagesToProducts<T extends { name: string; subcategory?: string; image?: string }>(
  products: T[]
): T[] {
  return products.map(product => ({
    ...product,
    image: product.image || getProductImage(product.name, product.subcategory),
  }));
}
