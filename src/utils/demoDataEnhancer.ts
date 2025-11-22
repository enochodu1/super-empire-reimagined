import { Product } from '@/types/product';

/**
 * Enhances products with demo rating data for showcase purposes
 * Adds realistic ratings and review counts to products
 */
export const enhanceProductsWithRatings = (products: Product[]): Product[] => {
  return products.map((product) => {
    // 70% of products have ratings (simulating real marketplace)
    if (Math.random() < 0.7) {
      // Generate realistic ratings (weighted towards higher ratings)
      const ratingRoll = Math.random();
      let rating: number;

      if (ratingRoll < 0.4) {
        // 40% chance of 5.0 or 4.8-4.9
        rating = ratingRoll < 0.2 ? 5.0 : 4.8 + Math.random() * 0.2;
      } else if (ratingRoll < 0.75) {
        // 35% chance of 4.3-4.7
        rating = 4.3 + Math.random() * 0.4;
      } else if (ratingRoll < 0.92) {
        // 17% chance of 3.8-4.2
        rating = 3.8 + Math.random() * 0.4;
      } else {
        // 8% chance of 3.0-3.7
        rating = 3.0 + Math.random() * 0.7;
      }

      // Round to 1 decimal place
      rating = Math.round(rating * 10) / 10;

      // Generate review counts (more popular items have more reviews)
      const reviewRoll = Math.random();
      let reviewCount: number;

      if (reviewRoll < 0.15) {
        // 15% have lots of reviews (popular items)
        reviewCount = Math.floor(50 + Math.random() * 200);
      } else if (reviewRoll < 0.40) {
        // 25% have moderate reviews
        reviewCount = Math.floor(20 + Math.random() * 50);
      } else {
        // 60% have few reviews
        reviewCount = Math.floor(3 + Math.random() * 20);
      }

      return {
        ...product,
        rating,
        reviewCount,
      };
    }

    // 30% of products don't have ratings yet
    return product;
  });
};

/**
 * Adds "Popular", "Trending", or "Best Seller" badges to top products
 */
export const addProductBadges = (products: Product[]): Product[] => {
  const sorted = [...products].sort((a, b) => {
    const aScore = (a.rating || 0) * (a.reviewCount || 0);
    const bScore = (b.rating || 0) * (b.reviewCount || 0);
    return bScore - aScore;
  });

  // Top 10% get badges
  const topCount = Math.floor(sorted.length * 0.1);
  const topIds = new Set(sorted.slice(0, topCount).map(p => p.id));

  return products.map(product => {
    if (topIds.has(product.id) && product.rating && product.rating >= 4.5) {
      return {
        ...product,
        badge: product.rating >= 4.8 ? 'Best Seller' : 'Popular',
      };
    }
    return product;
  });
};
