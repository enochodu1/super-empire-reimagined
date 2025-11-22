/**
 * Product Image URL Generator
 *
 * Generates placeholder image URLs for products based on category/subcategory.
 * Uses Unsplash Source API for high-quality produce photos.
 */

interface ImageMapping {
  [key: string]: string;
}

// Map subcategories to Unsplash search terms or specific image IDs
const categoryImages: ImageMapping = {
  // Produce - Fruits
  'Apples': 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&h=300&fit=crop',
  'Avocados': 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop',
  'Bananas': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop',
  'Melons': 'https://images.unsplash.com/photo-1582281298055-e25b84ab4b90?w=400&h=300&fit=crop',
  'Grapes': 'https://images.unsplash.com/photo-1599819177423-2139c3eb1304?w=400&h=300&fit=crop',
  'Lemons': 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&h=300&fit=crop',
  'Limes': 'https://images.unsplash.com/photo-1582561353511-c37ff1d0d028?w=400&h=300&fit=crop',
  'Oranges': 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=400&h=300&fit=crop',
  'Mangoes': 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop',
  'Peaches': 'https://images.unsplash.com/photo-1629828874514-7b098f1d7eb8?w=400&h=300&fit=crop',
  'Pears': 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400&h=300&fit=crop',
  'Pineapple': 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=300&fit=crop',
  'Strawberries': 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop',
  'Watermelon': 'https://images.unsplash.com/photo-1587049352846-4a222e784833?w=400&h=300&fit=crop',
  'Papayas': 'https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=400&h=300&fit=crop',

  // Produce - Vegetables
  'Beets': 'https://images.unsplash.com/photo-1585286595865-c8f4e38f7b42?w=400&h=300&fit=crop',
  'Broccoli': 'https://images.unsplash.com/photo-1584868049193-f1d25d1bbdf4?w=400&h=300&fit=crop',
  'Cabbage': 'https://images.unsplash.com/photo-1594282554945-c4e28add4e5c?w=400&h=300&fit=crop',
  'Carrots': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop',
  'Celery': 'https://images.unsplash.com/photo-1592670465866-aca3fd8dd179?w=400&h=300&fit=crop',
  'Chiles': 'https://images.unsplash.com/photo-1583663183825-902c05ce01b8?w=400&h=300&fit=crop',
  'Cilantro': 'https://images.unsplash.com/photo-1592200871226-69a4b89d6d0e?w=400&h=300&fit=crop',
  'Corn': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop',
  'Cucumbers': 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400&h=300&fit=crop',
  'Eggplant': 'https://images.unsplash.com/photo-1659261200833-ec994c5e65db?w=400&h=300&fit=crop',
  'Garlic': 'https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?w=400&h=300&fit=crop',
  'Green Onions': 'https://images.unsplash.com/photo-1600453200799-e77f6cb7ae64?w=400&h=300&fit=crop',
  'Jalapeños': 'https://images.unsplash.com/photo-1615485500838-a0e6dc19096b?w=400&h=300&fit=crop',
  'Kale': 'https://images.unsplash.com/photo-1582026288757-f02aaf985588?w=400&h=300&fit=crop',
  'Lettuce': 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop',
  'Mushrooms': 'https://images.unsplash.com/photo-1565981925018-f4a942c07fa3?w=400&h=300&fit=crop',
  'Okra': 'https://images.unsplash.com/photo-1596097635685-8ff89e08e11b?w=400&h=300&fit=crop',
  'Olives': 'https://images.unsplash.com/photo-1547959590-68272c34ff3c?w=400&h=300&fit=crop',
  'Onions': 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=400&h=300&fit=crop',
  'Peas': 'https://images.unsplash.com/photo-1569510066974-4b9a2faa2f82?w=400&h=300&fit=crop',
  'Peppers': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop',
  'Poblanos': 'https://images.unsplash.com/photo-1609702761882-1cbaec6e4086?w=400&h=300&fit=crop',
  'Potatoes': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop',
  'Radishes': 'https://images.unsplash.com/photo-1594498257673-9f36b767286c?w=400&h=300&fit=crop',
  'Serrano': 'https://images.unsplash.com/photo-1615485500834-bc10199bc6ed?w=400&h=300&fit=crop',
  'Spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop',
  'Squash': 'https://images.unsplash.com/photo-1615485925763-b51a691a7f18?w=400&h=300&fit=crop',
  'Tomatoes': 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop',
  'Tomatillos': 'https://images.unsplash.com/photo-1580522154071-c6ca47684037?w=400&h=300&fit=crop',
  'Turnips': 'https://images.unsplash.com/photo-1589119243778-c506be26c2df?w=400&h=300&fit=crop',
  'Zucchini': 'https://images.unsplash.com/photo-1584868049193-f1d25d1bbdf4?w=400&h=300&fit=crop',

  // Default fallback images
  'produce': 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&h=300&fit=crop',
  'tortilla': 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop',
  'dairy': 'https://images.unsplash.com/photo-1594455411395-ce8d5c86a76e?w=400&h=300&fit=crop',
};

/**
 * Get image URL for a product based on its subcategory or category
 */
export function getProductImageUrl(subcategory?: string, category?: string): string {
  // Try subcategory first
  if (subcategory && categoryImages[subcategory]) {
    return categoryImages[subcategory];
  }

  // Fallback to category
  if (category && categoryImages[category]) {
    return categoryImages[category];
  }

  // Ultimate fallback - fresh produce
  return categoryImages['produce'];
}

/**
 * Get placeholder image with text overlay (for items without specific images)
 */
export function getPlaceholderImage(text: string, width = 400, height = 300): string {
  return `https://placehold.co/${width}x${height}/228B22/white?text=${encodeURIComponent(text)}`;
}

/**
 * Batch update products with image URLs
 */
export function addImagesToProducts<T extends { subcategory?: string; category?: string; image?: string }>(
  products: T[]
): T[] {
  return products.map(product => ({
    ...product,
    image: product.image || getProductImageUrl(product.subcategory, product.category),
  }));
}
