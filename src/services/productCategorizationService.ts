/**
 * Product Categorization Service
 * Automatically assigns departments, enhanced subcategories, and tags based on product names
 * Inspired by Restaurant Depot's organization system
 */

import { Product, ProductTag } from '@/types/product';

/**
 * Department mapping - high-level organization
 */
export const DEPARTMENTS = {
  FRESH_PRODUCE: 'Fresh Produce',
  PREPARED_PRODUCE: 'Prepared Produce',
  BAKERY: 'Bakery & Tortillas',
  SPECIALTY: 'Specialty & Gourmet',
} as const;

/**
 * Get department based on product characteristics
 */
export function getDepartment(product: Product): string {
  const name = product.name.toLowerCase();

  // Tortillas and bread products
  if (product.category === 'tortilla' || name.includes('tortilla')) {
    return DEPARTMENTS.BAKERY;
  }

  // Pre-cut, prepared, or convenience items
  if (
    name.includes('pre-cut') ||
    name.includes('shredded') ||
    name.includes('sliced') ||
    name.includes('peeled') ||
    name.includes('salad mix')
  ) {
    return DEPARTMENTS.PREPARED_PRODUCE;
  }

  // Specialty items
  if (
    name.includes('organic') ||
    name.includes('heirloom') ||
    name.includes('exotic') ||
    name.includes('dragon fruit') ||
    name.includes('passion fruit')
  ) {
    return DEPARTMENTS.SPECIALTY;
  }

  // Default to fresh produce
  return DEPARTMENTS.FRESH_PRODUCE;
}

/**
 * Get enhanced subcategory based on product name
 */
export function getEnhancedSubcategory(product: Product): string {
  const name = product.name.toLowerCase();

  // Fruits
  if (name.includes('apple')) return 'Apples';
  if (name.includes('orange') || name.includes('lemon') || name.includes('lime') ||
      name.includes('grapefruit') || name.includes('mandarin')) return 'Citrus';
  if (name.includes('strawberry') || name.includes('blueberry') || name.includes('raspberry')) return 'Berries';
  if (name.includes('grape')) return 'Grapes';
  if (name.includes('melon') || name.includes('cantaloupe') || name.includes('honeydew') || name.includes('watermelon')) return 'Melons';
  if (name.includes('mango') || name.includes('pineapple') || name.includes('papaya') ||
      name.includes('banana') || name.includes('coconut') || name.includes('guava')) return 'Tropical Fruits';
  if (name.includes('peach') || name.includes('plum') || name.includes('nectarine') || name.includes('cherry')) return 'Stone Fruits';
  if (name.includes('dragon fruit') || name.includes('passion fruit') || name.includes('kiwi')) return 'Exotic Fruits';

  // Leafy & Salad
  if (name.includes('lettuce')) return 'Lettuce';
  if (name.includes('cabbage')) return 'Cabbage';
  if (name.includes('spinach') || name.includes('kale') || name.includes('collard') ||
      name.includes('chard') || name.includes('verdolaga')) return 'Greens';
  if (name.includes('cilantro') || name.includes('parsley') || name.includes('herb') ||
      name.includes('basil') || name.includes('mint')) return 'Herbs';
  if (name.includes('salad mix')) return 'Salads';

  // Root Vegetables
  if (name.includes('carrot')) return 'Carrots';
  if (name.includes('beet')) return 'Beets';
  if (name.includes('potato') || name.includes('potatoe')) return 'Potatoes';
  if (name.includes('onion')) return 'Onions';
  if (name.includes('garlic')) return 'Garlic';
  if (name.includes('ginger') || name.includes('jicama') || name.includes('yuca') ||
      name.includes('malanga') || name.includes('radish')) return 'Root Vegetables';

  // Other Vegetables
  if (name.includes('pepper') || name.includes('chili') || name.includes('jalapeno') ||
      name.includes('serrano') || name.includes('habanero') || name.includes('poblano')) return 'Peppers';
  if (name.includes('tomato') && !name.includes('tomatillo')) return 'Tomatoes';
  if (name.includes('tomatillo')) return 'Tomatillos';
  if (name.includes('cucumber')) return 'Cucumbers';
  if (name.includes('squash') || name.includes('zucchini') || name.includes('calabaza')) return 'Squash';
  if (name.includes('eggplant')) return 'Eggplant';
  if (name.includes('corn')) return 'Corn';
  if (name.includes('mushroom')) return 'Mushrooms';
  if (name.includes('celery')) return 'Celery';

  // Specialty & Mexican
  if (name.includes('nopal')) return 'Nopales';
  if (name.includes('chayote') || name.includes('tuna') || name.includes('penca')) return 'Mexican Produce';

  // Use existing subcategory if available
  return product.subcategory || 'Specialty';
}

/**
 * Automatically assign tags based on product characteristics
 */
export function assignProductTags(product: Product): ProductTag[] {
  const name = product.name.toLowerCase();
  const tags: ProductTag[] = [];

  // Quality & Source
  if (name.includes('organic')) tags.push('organic');
  else tags.push('conventional');

  if (name.includes('local') || name.includes('farm')) tags.push('local');
  if (name.includes('import')) tags.push('imported');
  tags.push('farm-fresh');

  // Quality tier
  if (name.includes('premium') || name.includes('select') || name.includes('choice')) {
    tags.push('premium');
  } else {
    tags.push('restaurant-grade');
  }

  // Preparation & Handling
  if (name.includes('pre-cut') || name.includes('cut')) tags.push('pre-cut');
  if (name.includes('pre-wash') || name.includes('washed')) tags.push('pre-washed');
  if (name.includes('ready') || name.includes('mix')) tags.push('ready-to-use');
  if (name.includes('peel')) tags.push('peeled');
  if (name.includes('slice')) tags.push('sliced');
  if (!tags.some(t => ['pre-cut', 'pre-washed', 'ready-to-use', 'peeled', 'sliced'].includes(t))) {
    tags.push('whole');
  }

  // Seasonality (simplified - would normally use date-based logic)
  const seasonalItems = ['strawberry', 'watermelon', 'pumpkin', 'asparagus'];
  const isSeasonalItem = seasonalItems.some(item => name.includes(item));

  if (isSeasonalItem) {
    tags.push('seasonal');
  } else {
    tags.push('year-round');
  }

  // Special Designations
  if (name.includes('heirloom')) tags.push('heirloom');
  if (name.includes('exotic') || name.includes('dragon') || name.includes('passion')) {
    tags.push('exotic');
  }

  // Storage & Handling
  if (name.includes('frozen')) {
    tags.push('frozen');
  } else if (product.category === 'tortilla') {
    tags.push('shelf-stable');
  } else {
    tags.push('refrigerated');
    tags.push('fresh-daily');
  }

  // Dietary
  if (product.category === 'produce') {
    tags.push('vegan');
  }
  if (!name.includes('wheat') && product.category !== 'tortilla') {
    tags.push('gluten-free');
  }
  tags.push('food-service');

  // Popular items (based on common restaurant staples)
  const popularItems = ['tomato', 'onion', 'lettuce', 'potato', 'bell pepper', 'banana', 'apple'];
  if (popularItems.some(item => name.includes(item))) {
    tags.push('bestseller');
  }

  return tags;
}

/**
 * Get origin based on product name and category
 */
export function getProductOrigin(product: Product): string {
  const name = product.name.toLowerCase();

  // Mexican specialty items
  if (
    name.includes('nopal') ||
    name.includes('chayote') ||
    name.includes('tomatillo') ||
    name.includes('calabaza') ||
    name.includes('malanga')
  ) {
    return 'Mexico';
  }

  // California produce
  if (
    name.includes('california') ||
    name.includes('avocado') ||
    name.includes('strawberry')
  ) {
    return 'California, USA';
  }

  // Florida citrus
  if (name.includes('orange') || name.includes('grapefruit')) {
    return 'Florida, USA';
  }

  // Idaho potatoes
  if (name.includes('idaho') || (name.includes('potato') && name.includes('baker'))) {
    return 'Idaho, USA';
  }

  // Tropical items
  if (
    name.includes('banana') ||
    name.includes('pineapple') ||
    name.includes('mango') ||
    name.includes('papaya')
  ) {
    return 'Central America';
  }

  return 'USA';
}

/**
 * Get preparation level
 */
export function getPreparationLevel(product: Product): 'whole' | 'pre-cut' | 'ready-to-use' | 'prepared' {
  const name = product.name.toLowerCase();

  if (name.includes('salad mix') || name.includes('ready')) return 'ready-to-use';
  if (name.includes('pre-cut') || name.includes('sliced') || name.includes('shredded')) return 'pre-cut';
  if (name.includes('peeled') || name.includes('prepared')) return 'prepared';

  return 'whole';
}

/**
 * Enhance a product with all categorization data
 */
export function enhanceProduct(product: Product): Product {
  return {
    ...product,
    department: getDepartment(product),
    subcategory: getEnhancedSubcategory(product),
    tags: assignProductTags(product),
    origin: getProductOrigin(product),
    seasonality: product.tags?.includes('seasonal') ? 'seasonal' : 'year-round',
    preparationLevel: getPreparationLevel(product),
  };
}

/**
 * Enhance an array of products
 */
export function enhanceProducts(products: Product[]): Product[] {
  return products.map(enhanceProduct);
}
